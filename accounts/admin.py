from django.contrib import admin
from .models import User, CartItem, PartyBooking, JobApplication


@admin.register(User)
class UserAdmin(admin.ModelAdmin):

    list_display = ( "id", "full_name", "mobile_no", "email", "gender", "city", "state", "created_at", "password", )
    search_fields = ( "full_name", "email", "mobile_no",) 
    list_filter = ( "gender", "state", "city",)
    


@admin.register(CartItem)
class UserCart(admin.ModelAdmin):
    list_display =('user', 'product_name', 'price', 'quantity', 'image_url', 'created_at')


@admin.register(PartyBooking)
class PartyBookingAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'phone', 'event_date', 'guests', 'package', 'created_at')
    search_fields = ('full_name', 'phone', 'package')
    list_filter = ('event_date', 'package')


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'city', 'position', 'experience', 'created_at')
    search_fields = ('full_name', 'email', 'position')
    list_filter = ('city', 'position', 'experience')