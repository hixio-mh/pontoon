# Generated by Django 3.2.4 on 2021-08-19 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0016_entity_key_required"),
    ]

    operations = [
        migrations.AddField(
            model_name="entity", name="context", field=models.TextField(blank=True),
        ),
    ]
