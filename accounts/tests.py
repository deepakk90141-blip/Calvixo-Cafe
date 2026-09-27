from datetime import date, timedelta

from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from .models import Coupon, DeliveryPartner, MenuItem, Order, PartyBooking, Restaurant


class AdminAuthAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.User = get_user_model()
        self.admin_user = self.User.objects.create_superuser(
            username="admin",
            email="admin@calvixo.com",
            password="Admin@1234",
        )
        self.normal_user = self.User.objects.create_user(
            username="customer",
            email="customer@calvixo.com",
            password="Customer@1234",
        )

    def test_admin_login_returns_tokens_for_superuser(self):
        response = self.client.post(
            reverse("admin_login"),
            {"username": "admin", "password": "Admin@1234"},
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertIn("access", response.json())
        self.assertEqual(response.json()["user"]["role"], "admin")

    def test_non_admin_cannot_access_admin_dashboard(self):
        self.client.force_authenticate(user=self.normal_user)
        response = self.client.get(reverse("admin_dashboard"))

        self.assertEqual(response.status_code, 403)

    def test_admin_dashboard_uses_database_counts(self):
        Restaurant.objects.create(name="Calvixo Central", address="Noida", city="Noida", is_active=True)
        MenuItem.objects.create(name="Classic Burger", category="Burgers", price=199, is_available=True)
        DeliveryPartner.objects.create(full_name="Ravi", phone="9876543210", vehicle="Bike", is_active=True)
        PartyBooking.objects.create(
            full_name="Asha",
            phone="9999999999",
            event_date="2026-08-20",
            guests=20,
            package="Premium",
            message="Birthday",
        )

        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(reverse("admin_dashboard"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["stats"]["restaurants"], 1)
        self.assertEqual(response.json()["stats"]["menus"], 1)
        self.assertEqual(response.json()["stats"]["deliveryPartners"], 1)
        self.assertEqual(response.json()["stats"]["partyBookings"], 1)

    def test_creating_new_coupon_inactivates_previous_active_coupons(self):
        Coupon.objects.create(
            code="OLD10",
            title="Old Offer",
            discount_percent=10,
            valid_from=date.today(),
            valid_to=date.today() + timedelta(days=7),
            is_active=True,
        )

        self.client.force_authenticate(user=self.admin_user)
        response = self.client.post(
            "/api/admin/coupons/",
            {
                "code": "NEW20",
                "title": "New Offer",
                "description": "Fresh deal",
                "discount_percent": 20,
                "valid_from": str(date.today()),
                "valid_to": str(date.today() + timedelta(days=7)),
                "is_active": True,
            },
            format="json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertFalse(Coupon.objects.get(code="OLD10").is_active)
        self.assertTrue(Coupon.objects.get(code="NEW20").is_active)

    def test_public_menu_items_returns_absolute_image_url(self):
        MenuItem.objects.create(
            name="Classic Burger",
            category="Burgers",
            price=199,
            is_available=True,
            image=SimpleUploadedFile("burger.jpg", b"fake-image", content_type="image/jpeg"),
        )

        response = self.client.get(reverse("public_menu_items"))

        self.assertEqual(response.status_code, 200)
        data = response.json()["data"]
        self.assertEqual(len(data), 1)
        self.assertTrue(data[0]["image_url"].startswith("http://testserver"))

    def test_admin_can_assign_order_to_delivery_partner(self):
        partner = DeliveryPartner.objects.create(full_name="Ravi", phone="9876543210", vehicle="Bike", is_active=True)
        order = Order.objects.create(
            order_number="ORD-1001",
            customer_name="Asha",
            customer_email="asha@example.com",
            phone="9999999999",
            delivery_address="Noida",
            items=[{"name": "Burger", "quantity": 1}],
            total_amount=199,
            payment_method="COD",
            status="Pending",
        )

        self.client.force_authenticate(user=self.admin_user)
        response = self.client.patch(
            f"/api/admin/orders/{order.id}/",
            {"delivery_partner": partner.id},
            format="json",
        )

        self.assertEqual(response.status_code, 200)
        order.refresh_from_db()
        self.assertEqual(order.delivery_partner_id, partner.id)

    def test_admin_settings_endpoint_returns_profile_and_activity(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get("/api/admin/auth/admin/settings/")

        self.assertEqual(response.status_code, 200)
        self.assertIn("admin", response.json())
        self.assertIn("login_activity", response.json())

    def test_admin_can_change_password(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.post(
            "/api/admin/auth/admin/change-password/",
            {
                "current_password": "Admin@1234",
                "new_password": "NewAdmin@1234",
                "confirm_password": "NewAdmin@1234",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertTrue(self.admin_user.check_password("NewAdmin@1234"))
