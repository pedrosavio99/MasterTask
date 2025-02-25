# Generated by Django 4.0.5 on 2023-08-08 23:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('demoapp', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todo',
            name='task',
        ),
        migrations.AddField(
            model_name='todo',
            name='assignees',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='todo',
            name='assigner',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='todo',
            name='created_at',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name='todo',
            name='status',
            field=models.CharField(choices=[('aberta', 'Aberta'), ('em_progresso', 'Em Progresso'), ('finalizada', 'Finalizada')], default='aberta', max_length=20),
        ),
        migrations.AddField(
            model_name='todo',
            name='title',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='todo',
            name='updated_at',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='todo',
            name='description',
            field=models.TextField(),
        ),
    ]
