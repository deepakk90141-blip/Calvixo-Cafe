from django.urls import path
from .import views
from .views import submit_review

urlpatterns = [
    path('', views.index, name='index'),
    path("login/", views.login),
    path("cart/", views.cart_list_create),
    path("cart/<int:user_id>/", views.cart_for_user),
    path("cart/item/<int:id>/", views.cart_item_delete),
    path("profile/<int:user_id>/", views.user_profile),
    path("profile/<int:user_id>/orders/", views.user_orders),
    path("profile/<int:user_id>/upload-image/", views.upload_profile_image),
    path("book-party/", views.book_party),
    path("apply-job/", views.apply_job),
    path("forgot-password/", views.forgot_password),
    path("reset-password/", views.reset_password),
    path("coupons/active/", views.active_coupons, name="active_coupons"),
    path("menus/public/", views.public_menu_items, name="public_menu_items"),
    path("reviews/public/", views.public_reviews, name="public_reviews"),
    path("news-blogs/public/", views.public_news_blogs, name="public_news_blogs"),
    path("settings/public/", views.public_site_settings, name="public_site_settings"),
    path("submit-review/", submit_review, name="submit_review"),
]