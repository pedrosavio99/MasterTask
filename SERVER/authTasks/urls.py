from django.urls import path

from . import views

urlpatterns = [
    path('adicionar/', views.adicionar_tarefa, name='adicionar_tarefa'),
    path('listar/', views.listar_tarefas, name='listar_tarefas'),
    path('deletar-tarefa/<int:tarefa_id>/', views.deletar_tarefa, name='deletar_tarefa')
]