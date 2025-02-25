import pandas as pd
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from authusers.models import User
from authTasks.models import Todo

from .serializers import TaskSerializer


@api_view(['DELETE'])
def excluir_todos_finalizados(request):
    try:
        # Filtra todos os todos com o status 'finalizada'
        todos_finalizados = Todo.objects.filter(status='finalizada')

        # Exclua todos os todos com o status 'finalizada'
        todos_finalizados.delete()

        return Response({'message': 'Todos os todos com status "finalizada" foram excluídos com sucesso.'}, status=200)

    except Todo.DoesNotExist:
        return Response({'message': 'Não há todos com status "finalizada" para excluir.'}, status=404)


def export_todos_finalizados(request):
    try:
        # Filtra todos os todos com o status 'finalizada'
        todos_finalizados = Todo.objects.filter(status='finalizada')

        # Crie um DataFrame do pandas com os dados filtrados
        df = pd.DataFrame(list(todos_finalizados.values()))

        # Determine o formato da planilha (CSV)
        file_format = 'csv'

        # Crie uma resposta HTTP com o conteúdo da planilha exportada
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="todos_finalizados.{file_format}"'

        # Exporte o DataFrame para o formato de planilha (CSV)
        df.to_csv(response, index=False)

        return response

    except Todo.DoesNotExist:
        return HttpResponse('Não há todos com status "finalizada" para exportar.', status=404)


@api_view(['PUT'])
def atualizar_updated_at_tarefa(request, tarefa_id):
    try:
        tarefa = Todo.objects.get(pk=tarefa_id)
    except Todo.DoesNotExist:
        return Response({'message': 'Tarefa não encontrada.'}, status=404)

    if 'updated_at' in request.data:
        tarefa.updated_at = request.data['updated_at']
        tarefa.save()

        return Response({'message': 'updated_at da tarefa atualizado com sucesso.'}, status=200)
    else:
        return Response({'message': 'Dados insuficientes para atualizar o updated_at.'}, status=400)


@api_view(['PUT'])
def atualizar_assignees_tarefa(request, tarefa_id):
    try:
        tarefa = Todo.objects.get(pk=tarefa_id)
    except Todo.DoesNotExist:
        return Response({'message': 'Tarefa não encontrada.'}, status=404)

    # Verifica se o campo 'assignees' está presente nos dados da requisição
    if 'assignees' in request.data:
        tarefa.assignees = request.data['assignees']
        tarefa.save()

        return Response({'message': 'Assignees da tarefa atualizado com sucesso.'}, status=200)
    else:
        return Response({'message': 'Dados insuficientes para atualizar o assignees.'}, status=400)


@api_view(['PUT'])
def mudar_status_tarefa(request, tarefa_id):
    try:
        tarefa = Todo.objects.get(pk=tarefa_id)
    except Todo.DoesNotExist:
        return Response({'message': 'Tarefa não encontrada.'}, status=404)

    novo_status = request.data.get('status')
    comentariofinal = request.data.get('comentariofinal', '')  # Adicione esta linha para obter o valor de "comentariofinal" do request

    if novo_status and novo_status in [choice[0] for choice in Todo.STATUS_CHOICES]:
        tarefa.status = novo_status
        tarefa.comentariofinal = comentariofinal  # Atualize o campo "comentariofinal" com o valor do request
        tarefa.save()
        return Response({'message': 'Status da tarefa atualizado com sucesso.'}, status=200)
    else:
        return Response({'message': 'Status inválido.'}, status=400)


@api_view(['DELETE'])
def deletar_tarefa(request, tarefa_id):
    try:
        tarefa = Todo.objects.get(pk=tarefa_id)
    except Todo.DoesNotExist:
        return Response({'message': 'Tarefa não encontrada.'},status=404)

    tarefa.delete()
    return Response({'message': 'Tarefa deletada com sucesso.'}, status=200)


@api_view(['POST'])
def adicionar_tarefa(request):
    title = request.data["title"]
    status = request.data["status"]
    description = request.data["description"]
    assignee_matricula = request.data["assigner"] 
    # assignees = request.data["assignees"]  
    assignees = request.data.get("assignees", [])
    created_at = request.data["created_at"]  
    updated_at = request.data["updated_at"]
    comentariofinal = request.data["comentariofinal"]
    pausado = request.data["pausado"]

    try:
        assigner = User.objects.get(matricula=assignee_matricula, role='adm')
    except User.DoesNotExist:
        return Response({'message': 'Usuário atribuidor não encontrado ou não é um administrador.'}, status=400)

    serializer = TaskSerializer(data={
        'title': title,
        'description': description,
        "status" : status,
        'assigner': assigner.name, 
        'assignees': str(assignees),
        "created_at": created_at, 
        "updated_at": updated_at,
        "comentariofinal": comentariofinal,
        "pausado": pausado,
    })

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
def listar_tarefas(request):
    tarefas = Todo.objects.all()
    serializer = TaskSerializer(tarefas, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def listar_tarefas_listas(request):
    # Obtenha a lista de strings a partir dos parâmetros da solicitação GET
    search_strings = request.GET.getlist('search_strings[]', [])

    # Filtra as tarefas com base nas strings de pesquisa
    tarefas = Todo.objects.filter(assignees__overlap=search_strings)

    serializer = TaskSerializer(tarefas, many=True)
    return Response(serializer.data, status=200)


@api_view(['PUT'])
def mudar_pausado_tarefa(request, tarefa_id):
    try:
        tarefa = Todo.objects.get(pk=tarefa_id)
    except Todo.DoesNotExist:
        return Response({'message': 'Tarefa não encontrada.'}, status=404)

    novo_pausado = request.data.get('pausado')

    if novo_pausado is not None:
        tarefa.pausado = novo_pausado  # Atualize o campo "pausado" com o valor do request
        tarefa.save()
        return Response({'message': 'Propriedade "pausado" da tarefa atualizada com sucesso.'}, status=200)
    else:
        return Response({'message': 'Valor de "pausado" inválido.'}, status=400)
    
@api_view(['POST'])
def adicionar_tarefa_paused(request):
    title = request.data["title"]
    status = request.data["status"]
    description = request.data["description"]
    # assignee_matricula = request.data["assigner"] 
    assigner = request.data["assigner"]  
    assignees = request.data.get("assignees", [])
    created_at = request.data["created_at"]  
    updated_at = request.data["updated_at"]
    comentariofinal = request.data["comentariofinal"]
    pausado = request.data["pausado"]


    serializer = TaskSerializer(data={
        'title': title,
        'description': description,
        "status" : status,
        'assigner': assigner, 
        'assignees': str(assignees),
        "created_at": created_at, 
        "updated_at": updated_at,
        "comentariofinal": comentariofinal,
        "pausado": pausado,
    })

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)