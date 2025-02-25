# from authusers.models import User

from django.db import models


class Todo(models.Model):
    STATUS_CHOICES = [
        ('aberta', 'Aberta'),
        ('em_progresso', 'Em Progresso'),
        ('finalizada', 'Finalizada'),
    ]

    title = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='aberta')
    assignees = models.CharField(max_length=100, blank=True)
    assigner = models.CharField(max_length=100, blank=True)
    created_at = models.CharField(max_length=200, blank=True)
    updated_at = models.CharField(max_length=200, blank=True)
    comentariofinal = models.CharField(max_length=200, blank=True)
    pausado = models.BooleanField(blank=True)

    def __str__(self):
        return self.title