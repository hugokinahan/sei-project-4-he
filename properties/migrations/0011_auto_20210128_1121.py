# Generated by Django 3.1.5 on 2021-01-28 11:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0010_property_favorited_by'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='property',
            name='favorited_by',
        ),
        migrations.RemoveField(
            model_name='property',
            name='owner',
        ),
    ]