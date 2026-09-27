from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Create a default superuser for the admin panel"

    def handle(self, *args, **options):
        User = get_user_model()
        username = "admin"
        email = "admin@calvixo.com"
        password = "Admin@1234"

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username=username, email=email, password=password)
            self.stdout.write(self.style.SUCCESS("Created admin superuser"))
            return

        user = User.objects.get(username=username)
        user.email = email
        user.is_staff = True
        user.is_superuser = True
        user.set_password(password)
        user.save()
        self.stdout.write(self.style.SUCCESS("Updated admin superuser"))
