# Generated by Django 3.2.8 on 2021-10-27 16:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='genres',
        ),
        migrations.RemoveField(
            model_name='user',
            name='profile_image',
        ),
    ]
