from django.contrib import admin
from django.urls import include, path

from authusers.views import (alterar_papel, cadastro, deletar_usuario,
                             listar_usuarios, login)
from authTasks.views import (adicionar_tarefa, adicionar_tarefa_paused,
                           atualizar_assignees_tarefa,
                           atualizar_updated_at_tarefa, deletar_tarefa,
                           excluir_todos_finalizados, export_todos_finalizados,
                           listar_tarefas, mudar_pausado_tarefa,
                           mudar_status_tarefa)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('cadastrar/', adicionar_tarefa, name='cadastrar'),
    path('cadastrar_pausado/', adicionar_tarefa_paused, name='cadastrar_pausado'),
    path('listar/', listar_tarefas, name='listar'),
    path('deletar-tarefa/<int:tarefa_id>/', deletar_tarefa, name='deletar_tarefa'),
    path('login/', login, name='login'),
    path('cadastro/', cadastro, name='cadastro'),
    path('listarusers/', listar_usuarios, name='listar_usuarios'),
    path('usuarios/<str:matricula>/', deletar_usuario, name='deletar_usuario'),
    path('usuarios/<str:matricula>/alterar-papel/', alterar_papel, name='alterar_papel'),
    path('mudar-status-tarefa/<int:tarefa_id>/', mudar_status_tarefa, name='mudar_status_tarefa'),
    path('mudar-pausado-tarefa/<int:tarefa_id>/', mudar_pausado_tarefa, name='mudar_pausado_tarefa'),
    path('atualizar-assignees-tarefa/<int:tarefa_id>/', atualizar_assignees_tarefa, name='atualizar_assignees_tarefa'),
    path('atualizar-updated-at-tarefa/<int:tarefa_id>/', atualizar_updated_at_tarefa, name='atualizar_updated_at_tarefa'),
    path('export-todos-finalizados/', export_todos_finalizados, name='export_todos_finalizados'),
    path('excluir-todos-finalizados/', excluir_todos_finalizados, name='excluir_todos_finalizados'),
]
