# Generated by Django 3.2.5 on 2021-07-12 21:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0003_auto_20210711_2102'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todo',
            name='corequisites',
        ),
        migrations.AddField(
            model_name='todo',
            name='grade',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='todo',
            name='units',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]