from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("accounts", "0013_user_profile_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="newsblog",
            name="image_url",
            field=models.URLField(blank=True),
        ),
    ]