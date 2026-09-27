from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .admin_views import (
    AdminTokenObtainPairView,
    CouponViewSet,
    CustomerViewSet,
    DeliveryPartnerViewSet,
    MenuItemViewSet,
    NewsBlogViewSet,
    OrderViewSet,
    PartyBookingViewSet,
    ReportEntryViewSet,
    RestaurantViewSet,
    ReviewSubmissionViewSet,
    SiteSettingViewSet,
    admin_change_password,
    admin_current_user,
    admin_dashboard,
    admin_forgot_password,
    admin_logout_all_devices,
    admin_reset_password,
    admin_settings,
    admin_update_profile,
    admin_upload_profile_photo,
)

router = DefaultRouter()
router.register(r"restaurants", RestaurantViewSet, basename="admin-restaurants")
router.register(r"menus", MenuItemViewSet, basename="admin-menus")
router.register(r"orders", OrderViewSet, basename="admin-orders")
router.register(r"delivery-partners", DeliveryPartnerViewSet, basename="admin-delivery-partners")
router.register(r"customers", CustomerViewSet, basename="admin-customers")
router.register(r"party-bookings", PartyBookingViewSet, basename="admin-party-bookings")
router.register(r"news-blogs", NewsBlogViewSet, basename="admin-news-blogs")
router.register(r"reviews", ReviewSubmissionViewSet, basename="admin-reviews")
router.register(r"coupons", CouponViewSet, basename="admin-coupons")
router.register(r"reports", ReportEntryViewSet, basename="admin-reports")
router.register(r"settings", SiteSettingViewSet, basename="admin-settings")

urlpatterns = [
    path("auth/admin/login/", AdminTokenObtainPairView.as_view(), name="admin_login"),
    path("auth/admin/me/", admin_current_user, name="admin_me"),
    path("auth/admin/settings/", admin_settings, name="admin_settings"),
    path("auth/admin/profile/", admin_update_profile, name="admin_update_profile"),
    path("auth/admin/profile-photo/", admin_upload_profile_photo, name="admin_upload_profile_photo"),
    path("auth/admin/change-password/", admin_change_password, name="admin_change_password"),
    path("auth/admin/forgot-password/", admin_forgot_password, name="admin_forgot_password"),
    path("auth/admin/reset-password/", admin_reset_password, name="admin_reset_password"),
    path("auth/admin/logout-all-devices/", admin_logout_all_devices, name="admin_logout_all_devices"),
    path("dashboard/", admin_dashboard, name="admin_dashboard"),
    path("", include(router.urls)),
]
