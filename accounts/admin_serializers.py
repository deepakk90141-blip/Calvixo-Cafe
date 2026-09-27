from rest_framework import serializers

from .models import Coupon, DeliveryPartner, MenuItem, NewsBlog, Order, PartyBooking, ReportEntry, Restaurant, ReviewSubmission, SiteSetting, User


class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "full_name", "email", "mobile_no", "city", "state"]


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = "__all__"


class MenuItemSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = MenuItem
        fields = ["id", "restaurant", "name", "category", "price", "image", "image_url", "is_available", "created_at", "updated_at"]

    def get_image_url(self, obj):
        if not obj.image:
            return None
        request = self.context.get("request")
        if request is not None:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url


class DeliveryPartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryPartner
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    delivery_partner_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"

    def get_delivery_partner_name(self, obj):
        return obj.delivery_partner.full_name if obj.delivery_partner else None


class PartyBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartyBooking
        fields = "__all__"


class NewsBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsBlog
        fields = "__all__"


class ReviewSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewSubmission
        fields = "__all__"


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = "__all__"


class ReportEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportEntry
        fields = "__all__"


class SiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSetting
        fields = "__all__"
