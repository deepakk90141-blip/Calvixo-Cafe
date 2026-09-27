from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import date, timedelta

from accounts.models import Coupon, DeliveryPartner, MenuItem, NewsBlog, ReportEntry, Restaurant, ReviewSubmission, SiteSetting


class Command(BaseCommand):
    help = 'Seed the site with realistic demo data for menu, reviews, news, coupons, reports, settings, and partners.'

    def handle(self, *args, **options):
        Restaurant.objects.all().delete()
        MenuItem.objects.all().delete()
        DeliveryPartner.objects.all().delete()
        NewsBlog.objects.all().delete()
        ReviewSubmission.objects.all().delete()
        Coupon.objects.all().delete()
        ReportEntry.objects.all().delete()
        SiteSetting.objects.all().delete()

        restaurant = Restaurant.objects.create(name='Calvixo Central', address='Noida Sector 18', city='Noida', is_active=True)

        menu_items = [
            ('Cheese Burger', 'Burger', 199, True),
            ('Veg Momos', 'Momos', 149, True),
            ('Crispy Samosa', 'Samosa', 79, True),
            ('Paneer Manchurian', 'Manchurian', 189, True),
            ('Margherita Pizza', 'Pizza', 249, True),
            ('Chicken Wrap', 'Wraps', 179, True),
            ('Cold Coffee', 'Beverages', 99, True),
            ('Chocolate Shake', 'Beverages', 129, True),
            ('Loaded Fries', 'Sides', 109, True),
            ('Veg Noodles', 'Noodles', 159, True),
        ]
        for name, category, price, is_available in menu_items:
            MenuItem.objects.create(restaurant=restaurant, name=name, category=category, price=price, is_available=is_available)

        DeliveryPartner.objects.create(full_name='Ravi Sharma', phone='9876543210', vehicle='Bike', is_active=True)
        DeliveryPartner.objects.create(full_name='Neha Singh', phone='9876543211', vehicle='Scooter', is_active=True)
        DeliveryPartner.objects.create(full_name='Aman Verma', phone='9876543212', vehicle='Bike', is_active=True)

        NewsBlog.objects.create(title='New summer combo launched', category='Offer', excerpt='Enjoy a fresh combo at discounted prices.', content='Our new summer combo is now live with burgers and cold beverages.', is_published=True)
        NewsBlog.objects.create(title='Fast delivery now available in 20 minutes', category='Service', excerpt='We are expanding delivery coverage across the city.', content='Customers can now enjoy faster delivery in major neighborhoods.', is_published=True)
        NewsBlog.objects.create(title='Party booking slots filling fast', category='Events', excerpt='Book your birthday or office party early.', content='We are receiving a high number of party requests this month.', is_published=True)

        ReviewSubmission.objects.create(customer_name='Rahul Sharma', email='rahul@example.com', rating=5, comment='Best burgers and super fast delivery.', status='Approved')
        ReviewSubmission.objects.create(customer_name='Priya Mehta', email='priya@example.com', rating=5, comment='Loved the momos and the packaging quality.', status='Approved')
        ReviewSubmission.objects.create(customer_name='Aman Verma', email='aman@example.com', rating=4, comment='Great service and tasty food.', status='Pending')
        ReviewSubmission.objects.create(customer_name='Sneha Gupta', email='sneha@example.com', rating=5, comment='Excellent experience for my office party.', status='Approved')
        ReviewSubmission.objects.create(customer_name='Kiran Singh', email='kiran@example.com', rating=4, comment='The combo offer made the order worth it.', status='Pending')

        Coupon.objects.create(code='WELCOME20', title='First Order', description='Flat 20% off on your first order.', discount_percent=20, valid_from=date.today() - timedelta(days=2), valid_to=date.today() + timedelta(days=10), is_active=True)
        Coupon.objects.create(code='FREESHIP', title='Free Delivery', description='Free delivery on orders above ₹499.', discount_percent=10, valid_from=date.today() - timedelta(days=5), valid_to=date.today() + timedelta(days=20), is_active=True)
        Coupon.objects.create(code='PARTY30', title='Party Special', description='30% off for party orders.', discount_percent=30, valid_from=date.today() - timedelta(days=1), valid_to=date.today() + timedelta(days=5), is_active=True)

        ReportEntry.objects.create(title='Daily Orders', summary='Orders are trending upward this week.', metric_value='128 orders', trend='Up', status='Healthy')
        ReportEntry.objects.create(title='Customer Satisfaction', summary='Customers are responding well to our new offers.', metric_value='4.8/5', trend='Up', status='Healthy')
        ReportEntry.objects.create(title='Delivery Performance', summary='Average delivery time is within target.', metric_value='22 mins', trend='Stable', status='Healthy')

        SiteSetting.objects.create(key='site_title', value='Calvixo Foods', description='The main site title shown to visitors.')
        SiteSetting.objects.create(key='delivery_fee', value='₹49', description='Delivery fee shown on the checkout page.')
        SiteSetting.objects.create(key='support_number', value='+91 98765 43210', description='Customer support number for the site.')

        self.stdout.write(self.style.SUCCESS('Seed data created successfully.'))
