import json
import random
from datetime import date

from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.models import User as DjangoUser
from django.core.files.storage import default_storage
from django.core.mail import send_mail
from django.utils import timezone
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Coupon, DeliveryPartner, MenuItem, NewsBlog, Order, PartyBooking, ReportEntry, Restaurant, ReviewSubmission, SiteSetting, User
from .admin_serializers import (
    AdminUserSerializer,
    CouponSerializer,
    DeliveryPartnerSerializer,
    MenuItemSerializer,
    NewsBlogSerializer,
    OrderSerializer,
    PartyBookingSerializer,
    ReportEntrySerializer,
    RestaurantSerializer,
    ReviewSubmissionSerializer,
    SiteSettingSerializer,
)


class IsAdminRole(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and (request.user.is_staff or request.user.is_superuser)
        )


def _get_admin_setting(key, default=""):
    try:
        return SiteSetting.objects.get(key=key).value
    except SiteSetting.DoesNotExist:
        return default


def _set_admin_setting(key, value):
    setting, _ = SiteSetting.objects.get_or_create(key=key)
    setting.value = value
    setting.save()
    return setting


def _get_login_activity(request):
    activity = []
    raw_activity = _get_admin_setting("admin_login_activity", "[]")
    try:
        activity = json.loads(raw_activity) if raw_activity else []
    except json.JSONDecodeError:
        activity = []

    activity.append(
        {
            "timestamp": timezone.now().isoformat(),
            "event": "Viewed settings",
            "ip": request.META.get("REMOTE_ADDR", "Unknown"),
        }
    )
    if len(activity) > 8:
        activity = activity[-8:]
    _set_admin_setting("admin_login_activity", json.dumps(activity))
    return activity


class AdminTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = "username"

    def validate(self, attrs):
        username_or_email = attrs.get("username") or attrs.get("email")
        password = attrs.get("password")

        if not username_or_email or not password:
            raise AuthenticationFailed("Username or email and password are required.")

        user_obj = get_user_model().objects.filter(email=username_or_email).first()
        if user_obj:
            authenticated = authenticate(username=user_obj.username, password=password)
        else:
            authenticated = authenticate(username=username_or_email, password=password)

        if not authenticated or not authenticated.is_active:
            raise AuthenticationFailed("Invalid credentials.")

        if not (authenticated.is_staff or authenticated.is_superuser):
            raise AuthenticationFailed("Only administrators can access the admin panel.")

        data = super().validate({"username": authenticated.username, "password": password})
        data["user"] = {
            "id": authenticated.id,
            "username": authenticated.username,
            "email": authenticated.email,
            "role": "admin",
        }
        return data


class AdminTokenObtainPairView(TokenObtainPairView):
    serializer_class = AdminTokenObtainPairSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated, IsAdminRole])
def admin_dashboard(request):
    customer_count = User.objects.count()
    restaurant_count = Restaurant.objects.count()
    menu_count = MenuItem.objects.count()
    order_count = Order.objects.count()
    delivery_partner_count = DeliveryPartner.objects.count()
    party_booking_count = PartyBooking.objects.count()

    return Response(
        {
            "message": "Admin access granted",
            "user": {
                "id": request.user.id,
                "username": request.user.username,
                "email": request.user.email,
                "role": "admin",
            },
            "stats": {
                "customers": customer_count,
                "restaurants": restaurant_count,
                "menus": menu_count,
                "orders": order_count,
                "deliveryPartners": delivery_partner_count,
                "partyBookings": party_booking_count,
            },
        }
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated, IsAdminRole])
def admin_current_user(request):
    return Response(
        {
            "user": {
                "id": request.user.id,
                "username": request.user.username,
                "email": request.user.email,
            },
            "role": "admin",
        }
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated, IsAdminRole])
def admin_settings(request):
    return Response(
        {
            "admin": {
                "id": request.user.id,
                "username": request.user.username,
                "full_name": request.user.get_full_name() or request.user.username,
                "email": request.user.email,
                "mobile_number": _get_admin_setting("admin_profile_mobile", ""),
                "profile_photo": _get_admin_setting("admin_profile_photo", ""),
                "account_status": "Active" if request.user.is_active else "Inactive",
            },
            "login_activity": _get_login_activity(request),
            "last_login": request.user.last_login.isoformat() if request.user.last_login else None,
        }
    )


@api_view(["PATCH"])
@permission_classes([IsAuthenticated, IsAdminRole])
def admin_update_profile(request):
    full_name = request.data.get("full_name", "").strip()
    email = request.data.get("email", "").strip()
    mobile_number = request.data.get("mobile_number", "").strip()

    if full_name:
        parts = full_name.split(maxsplit=1)
        request.user.first_name = parts[0]
        request.user.last_name = parts[1] if len(parts) > 1 else ""
    if email:
        request.user.email = email
    request.user.save()

    if mobile_number:
        _set_admin_setting("admin_profile_mobile", mobile_number)
    if full_name:
        _set_admin_setting("admin_profile_name", full_name)

    return Response(
        {
            "message": "Profile updated successfully.",
            "admin": {
                "id": request.user.id,
                "username": request.user.username,
                "full_name": request.user.get_full_name() or request.user.username,
                "email": request.user.email,
                "mobile_number": _get_admin_setting("admin_profile_mobile", ""),
                "profile_photo": _get_admin_setting("admin_profile_photo", ""),
                "account_status": "Active" if request.user.is_active else "Inactive",
            },
        }
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated, IsAdminRole])
def admin_upload_profile_photo(request):
    file_obj = request.FILES.get("profile_image") or request.FILES.get("image")
    if not file_obj:
        return Response({"message": "No image file provided."}, status=400)

    filename = f"admin_profile_images/{uuid.uuid4().hex}_{file_obj.name}"
    saved_path = default_storage.save(filename, file_obj)
    file_url = request.build_absolute_uri(default_storage.url(saved_path))
    _set_admin_setting("admin_profile_photo", file_url)

    return Response({"message": "Profile photo uploaded.", "profile_photo": file_url})


@api_view(["POST"])
@permission_classes([IsAuthenticated, IsAdminRole])
def admin_change_password(request):
    current_password = request.data.get("current_password", "")
    new_password = request.data.get("new_password", "")
    confirm_password = request.data.get("confirm_password", "")

    if not current_password or not new_password or not confirm_password:
        return Response({"message": "All password fields are required."}, status=400)

    if not request.user.check_password(current_password):
        return Response({"message": "Current password is incorrect."}, status=400)

    if new_password != confirm_password:
        return Response({"message": "New password and confirm password do not match."}, status=400)

    request.user.set_password(new_password)
    request.user.save()
    _set_admin_setting("admin_last_password_change", timezone.now().isoformat())
    return Response({"message": "Password changed successfully."})


@api_view(["POST"])
@permission_classes([IsAuthenticated, IsAdminRole])
def admin_forgot_password(request):
    email = request.data.get("email", "").strip()
    if not email:
        return Response({"message": "Email is required."}, status=400)

    if email != request.user.email:
        return Response({"message": "Only the current admin email can be used for reset."}, status=400)

    otp = str(random.randint(100000, 999999))
    _set_admin_setting("admin_password_reset_email", email)
    _set_admin_setting("admin_password_reset_otp", otp)

    try:
        send_mail(
            "Calvixo admin password reset",
            f"Your admin reset code is {otp}",
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )
    except Exception:
        pass

    return Response({"message": "Reset code sent to your email.", "otp": otp})


@api_view(["POST"])
@permission_classes([IsAuthenticated, IsAdminRole])
def admin_reset_password(request):
    email = request.data.get("email", "").strip()
    otp = request.data.get("otp", "").strip()
    new_password = request.data.get("new_password", "")
    confirm_password = request.data.get("confirm_password", "")

    if not email or not otp or not new_password or not confirm_password:
        return Response({"message": "All fields are required."}, status=400)

    if email != request.user.email:
        return Response({"message": "Email does not match the current admin account."}, status=400)

    expected_email = _get_admin_setting("admin_password_reset_email", "")
    expected_otp = _get_admin_setting("admin_password_reset_otp", "")
    if expected_email != email or expected_otp != otp:
        return Response({"message": "Invalid reset code."}, status=400)

    if new_password != confirm_password:
        return Response({"message": "New password and confirm password do not match."}, status=400)

    request.user.set_password(new_password)
    request.user.save()
    _set_admin_setting("admin_password_reset_email", "")
    _set_admin_setting("admin_password_reset_otp", "")
    return Response({"message": "Password reset successfully."})


@api_view(["POST"])
@permission_classes([IsAuthenticated, IsAdminRole])
def admin_logout_all_devices(request):
    _set_admin_setting("admin_logout_all_devices", "true")
    return Response({"message": "Logged out from all devices. Please sign in again."})


class RestaurantViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminRole]
    queryset = Restaurant.objects.all().order_by('-created_at')
    serializer_class = RestaurantSerializer


class MenuItemViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminRole]
    queryset = MenuItem.objects.all().order_by('-created_at')
    serializer_class = MenuItemSerializer
    parser_classes = [MultiPartParser, FormParser]


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminRole]
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer


class DeliveryPartnerViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminRole]
    queryset = DeliveryPartner.objects.all().order_by('-created_at')
    serializer_class = DeliveryPartnerSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminRole]
    queryset = User.objects.all().order_by('-created_at')
    serializer_class = AdminUserSerializer


class PartyBookingViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminRole]
    queryset = PartyBooking.objects.all().order_by('-created_at')
    serializer_class = PartyBookingSerializer


class NewsBlogViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminRole]
    queryset = NewsBlog.objects.all().order_by('-created_at')
    serializer_class = NewsBlogSerializer


class ReviewSubmissionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminRole]
    queryset = ReviewSubmission.objects.all().order_by('-created_at')
    serializer_class = ReviewSubmissionSerializer


class CouponViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminRole]
    queryset = Coupon.objects.all().order_by('-created_at')
    serializer_class = CouponSerializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        if response.status_code == 201:
            today = date.today()
            Coupon.objects.filter(is_active=True, valid_to__lt=today).update(is_active=False)
            Coupon.objects.filter(is_active=True).exclude(id=response.data.get('id')).update(is_active=False)
        return response


class ReportEntryViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminRole]
    queryset = ReportEntry.objects.all().order_by('-created_at')
    serializer_class = ReportEntrySerializer


class SiteSettingViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminRole]
    queryset = SiteSetting.objects.all().order_by('-created_at')
    serializer_class = SiteSettingSerializer
