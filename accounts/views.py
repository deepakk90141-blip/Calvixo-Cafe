from datetime import timedelta
import os
import random
import uuid

from django.conf import settings
from django.core.mail import send_mail
from django.db.models import Q
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Coupon, User, CartItem, PartyBooking, JobApplication, PasswordResetToken, ReviewSubmission, MenuItem, NewsBlog, SiteSetting, Order
from .serializers import UserSerializer, CartItemSerializer, PartyBookingSerializer, JobApplicationSerializer, OrderSerializer
import uuid
from django.core.files.storage import default_storage


@api_view(["GET","POST"])
def index(request):

    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response({
            "message": "User Created Successfully",
            "data": serializer.data
        })

    return Response(serializer.errors, status=400)


@api_view(["POST"])
def login(request):

    email = request.data.get("email")
    password = request.data.get("password")


    try:

        user = User.objects.get(
            email=email,
            password=password
        )


        return Response({
            "message":"Login Successful",
            "user":{
                "id":user.id,
                "full_name":user.full_name,
                "email":user.email,
                "mobile_no":user.mobile_no,
                "city":user.city,
                "state":user.state
            }
        })


    except User.DoesNotExist:

        return Response({
            "message":"Invalid Email or Password"
        }, status=400)


@api_view(["GET","POST"])
def cart_list_create(request):
    if request.method == "POST":
        raw_user = request.data.get('user')
        user_id = None
        if isinstance(raw_user, dict):
            user_id = raw_user.get('id') or raw_user.get('user_id') or raw_user.get('pk')
        elif raw_user is not None:
            user_id = raw_user

        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        payload = dict(request.data)
        payload['user'] = user_id
        if product_id is not None:
            payload['product_id'] = int(product_id)
        payload['quantity'] = quantity
        if 'price' in payload and payload['price'] is not None:
            try:
                payload['price'] = float(payload['price'])
            except (TypeError, ValueError):
                payload['price'] = None

        if user_id and product_id is not None:
            existing = CartItem.objects.filter(user_id=user_id, product_id=product_id).first()
            if existing:
                existing.quantity = existing.quantity + quantity
                existing.save()
                serializer = CartItemSerializer(existing)
                return Response({"message":"Cart updated","data":serializer.data})

        serializer = CartItemSerializer(data=payload)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Cart item added","data":serializer.data})
        return Response({"message": "Unable to add to cart", "errors": serializer.errors}, status=400)

    # GET without user id returns all cart items (admin use)
    items = CartItem.objects.all()
    serializer = CartItemSerializer(items, many=True)
    return Response({"data": serializer.data})


@api_view(["GET"])
def cart_for_user(request, user_id):
    items = CartItem.objects.filter(user_id=user_id)
    serializer = CartItemSerializer(items, many=True)
    return Response({"data": serializer.data})


@api_view(["GET", "PATCH"])
def user_profile(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"message": "User not found."}, status=404)

    if request.method == "PATCH":
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated successfully.", "data": serializer.data})
        return Response(serializer.errors, status=400)

    serializer = UserSerializer(user)
    return Response({"data": serializer.data})


@api_view(["GET"])
def user_orders(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"message": "User not found."}, status=404)

    orders = Order.objects.filter(Q(customer_email=user.email) | Q(phone=user.mobile_no)).order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response({"data": serializer.data})


@api_view(["POST"])
def upload_profile_image(request, user_id):
    """Accepts multipart file upload for user's profile image and saves it to media storage."""
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"message": "User not found."}, status=404)

    file_obj = request.FILES.get('image') or request.FILES.get('profile_image')
    if not file_obj:
        return Response({"message": "No image file provided."}, status=400)

    # Save file to default storage under profile_images/
    filename = f"profile_images/{uuid.uuid4().hex}_{file_obj.name}"
    saved_path = default_storage.save(filename, file_obj)
    file_url = default_storage.url(saved_path)

    # Build absolute URL so frontend can load it
    absolute_url = request.build_absolute_uri(file_url)
    user.profile_image = absolute_url
    user.save()

    serializer = UserSerializer(user)
    return Response({"message": "Profile image uploaded.", "data": serializer.data})


@csrf_exempt
@api_view(["POST"])
def book_party(request):
    serializer = PartyBookingSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Party booked successfully", "data": serializer.data})
    return Response(serializer.errors, status=400)


@csrf_exempt
@api_view(["POST"])
def apply_job(request):
    serializer = JobApplicationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Application submitted successfully", "data": serializer.data})
    return Response(serializer.errors, status=400)


# @csrf_exempt
# @api_view(["POST"])
# def forgot_password(request):
    email = request.data.get("email")
    if not email:
        return Response({"message": "Email is required."}, status=400)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"message": "If the email exists, a reset OTP has been sent."})

    otp = str(random.randint(100000, 999999))
    print(otp)
    expires_at = timezone.now() + timedelta(minutes=15)
    PasswordResetToken.objects.create(user=user, token=otp, expires_at=expires_at)

    reset_url = f"http://localhost:5173/reset-password"
    subject = "Calvixo Password Reset OTP"
    message = (
        f"Hello {user.full_name},\n\n"
        f"Your password reset OTP is: {otp}\n"
        f"This OTP is valid for 15 minutes.\n\n"
        f"You can reset your password here: {reset_url}\n\n"
        "If you did not request this, please ignore this email."
    )
    from_email = settings.DEFAULT_FROM_EMAIL

    try:
        send_mail(subject, message, from_email, [user.email], fail_silently=False)
    except Exception as exc:
        return Response({"message": "Unable to send reset email.", "error": str(exc)}, status=500)

    return Response({"message": "If the email exists, a reset OTP has been sent."})

@api_view(["POST"])
def forgot_password(request):
    email = request.data.get("email")

    if not email:
        return Response(
            {"message": "Email is required."},
            status=400
        )

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {"message": "If the email exists, a reset OTP has been sent."},
            status=200
        )

    # Generate OTP
    otp = str(random.randint(100000, 999999))
    print("OTP:", otp)

    # Expiry time
    expires_at = timezone.now() + timedelta(minutes=15)

    # Save OTP
    PasswordResetToken.objects.create(
        user=user,
        token=otp,
        expires_at=expires_at
    )

    reset_url = "http://localhost:5173/reset-password"

    subject = "Calvixo Password Reset OTP"

    message = (
        f"Hello {user.full_name},\n\n"
        f"Your password reset OTP is: {otp}\n"
        f"This OTP is valid for 15 minutes.\n\n"
        f"You can reset your password here: {reset_url}\n\n"
        "If you did not request this, please ignore this email."
    )

    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )

        print("EMAIL SENT SUCCESSFULLY")

    except Exception as exc:
        print("========== EMAIL ERROR ==========")
        print("TYPE:", type(exc).__name__)
        print("ERROR:", str(exc))
        print("=================================")

        return Response(
            {
                "message": "Unable to send reset OTP. Please try again."
            },
            status=500
        )

    # THIS RETURN IS successful message
    return Response(
        {
            "message": "OTP sent successfully."
        },
        status=200
    )



@csrf_exempt
@api_view(["POST"])
def reset_password(request):
    token = request.data.get("token")
    password = request.data.get("password")
    if not token or not password:
        return Response({"message": "Token and new password are required."}, status=400)

    reset_token = PasswordResetToken.objects.filter(token=token, used=False, expires_at__gt=timezone.now()).first()
    if not reset_token:
        return Response({"message": "Invalid or expired reset token."}, status=400)

    user = reset_token.user
    user.password = password
    user.save()

    reset_token.used = True
    reset_token.save()

    return Response({"message": "Password has been reset successfully."})


@api_view(["GET"])
def active_coupons(request):
    today = timezone.now().date()
    coupons = Coupon.objects.filter(is_active=True, valid_from__lte=today, valid_to__gte=today).order_by('-created_at')
    return Response({"data": [{
        "id": coupon.id,
        "code": coupon.code,
        "title": coupon.title,
        "description": coupon.description,
        "discount_percent": coupon.discount_percent,
    } for coupon in coupons]})


@api_view(["GET"])
def public_menu_items(request):
    items = MenuItem.objects.filter(is_available=True).order_by('category', 'name')
    return Response({"data": [{
        "id": item.id,
        "name": item.name,
        "category": item.category,
        "price": float(item.price),
        "is_available": item.is_available,
        "image_url": request.build_absolute_uri(item.image.url) if item.image else None,
        "description": f"{item.category} specialty",
    } for item in items]})


@api_view(["GET"])
def public_reviews(request):
    reviews = ReviewSubmission.objects.filter(status='Approved').order_by('-created_at')
    return Response({"data": [{
        "id": review.id,
        "customer_name": review.customer_name,
        "rating": review.rating,
        "comment": review.comment,
        "status": review.status,
    } for review in reviews]})


@api_view(["GET"])
def public_news_blogs(request):
    news_items = NewsBlog.objects.filter(is_published=True).order_by('-created_at')
    return Response({"data": [{
        "id": item.id,
        "title": item.title,
        "category": item.category,
        "image_url": item.image_url,
        "excerpt": item.excerpt,
        "content": item.content,
        "is_published": item.is_published,
        "created_at": item.created_at.isoformat(),
    } for item in news_items]})


@api_view(["GET"])
def public_site_settings(request):
    settings_items = SiteSetting.objects.all().order_by('key')
    return Response({"data": [{
        "id": setting.id,
        "key": setting.key,
        "value": setting.value,
        "description": setting.description,
    } for setting in settings_items]})


@csrf_exempt
@api_view(["POST"])
def submit_review(request):
    customer_name = request.data.get("customer_name")
    email = request.data.get("email")
    rating = request.data.get("rating")
    comment = request.data.get("comment")

    if not all([customer_name, email, rating, comment]):
        return Response({"message": "All fields are required."}, status=400)

    review = ReviewSubmission.objects.create(
        customer_name=customer_name,
        email=email,
        rating=int(rating),
        comment=comment,
        status="Pending",
    )

    return Response({
        "message": "Review submitted successfully.",
        "data": {
            "id": review.id,
            "customer_name": review.customer_name,
            "rating": review.rating,
            "status": review.status,
        }
    })


@api_view(["PATCH", "DELETE"])
def cart_item_delete(request, id):
    try:
        item = CartItem.objects.get(id=id)
    except CartItem.DoesNotExist:
        return Response({"message":"Not found"}, status=404)

    if request.method == "DELETE":
        item.delete()
        return Response({"message":"Deleted"})

    # PATCH -> partial update (e.g., quantity)
    if request.method == "PATCH":
        qty = request.data.get("quantity")
        if qty is not None:
            try:
                qty = int(qty)
            except Exception:
                return Response({"message":"Invalid quantity"}, status=400)
            if qty <= 0:
                item.delete()
                return Response({"message":"Deleted"})
            item.quantity = qty
            item.save()
            serializer = CartItemSerializer(item)
            return Response({"message":"Updated","data":serializer.data})

        # allow other partial updates
        serializer = CartItemSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"Updated","data":serializer.data})
        return Response(serializer.errors, status=400)