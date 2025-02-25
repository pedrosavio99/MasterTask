from django.db import models


# Create your models here.
class User(models.Model):
    ROLE_CHOICES = [
        ('adm', 'Administrador'),
        ('gm', 'GM'),
        ('tec', 'Técnico'),
    ]

    matricula = models.CharField(max_length=6, unique=True)
    name = models.CharField(max_length=60)
    senha = models.CharField(max_length=4)
    role = models.CharField(max_length=3, choices=ROLE_CHOICES, default='tec')

    def __str__(self):
        return self.matricula