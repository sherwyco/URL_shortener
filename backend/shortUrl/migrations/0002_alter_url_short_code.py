# Generated by Django 4.1.5 on 2023-01-31 05:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shortUrl', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='url',
            name='short_code',
            field=models.CharField(max_length=10, unique=True),
        ),
    ]
