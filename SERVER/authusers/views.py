import json

from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from django.views.decorators.csrf import csrf_exempt

from .models import User


@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        matricula = data.get('matricula')
        senha = data.get('senha')
        user = get_object_or_404(User, matricula=matricula, senha=senha)
        return JsonResponse({'message': 'Login realizado com sucesso!', 'matricula': user.matricula, "name": user.name, "role": user.role})
    return JsonResponse({'message': 'Método inválido! Use POST para login.'}, status=400)

@csrf_exempt
def cadastro(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        matricula = data.get('matricula')
        name = data.get('name')
        senha = data.get('senha')
        role = data.get('role', 'tec')  # Define 'tec' como valor padrão caso 'role' não esteja presente

        # Verifica se a matrícula já existe
        if User.objects.filter(matricula=matricula).exists():
            return JsonResponse({'message': 'Matrícula já cadastrada!'}, status=400)

        if len(matricula) == 6 and len(senha) == 4:
            user, created = User.objects.get_or_create(matricula=matricula, senha=senha, name=name, role=role)
            if created:
                return JsonResponse({'message': 'Cadastro realizado com sucesso!', 'matricula': user.matricula, 'name': user.name, 'role': user.role})
            else:
                return JsonResponse({'message': 'Usuário já cadastrado!'}, status=400)
        else:
            return JsonResponse({'message': 'Matrícula e senha devem ter 6 dígitos!'}, status=400)
    return JsonResponse({'message': 'Método inválido! Use POST para cadastro.'}, status=400)


def listar_usuarios(request):
    users = User.objects.all()
    data = [{'matricula': user.matricula, 'name': user.name, "role": user.role} for user in users]
    return JsonResponse(data, safe=False)

@csrf_exempt
def deletar_usuario(request, matricula):
    if request.method == 'DELETE':
        user = User.objects.filter(matricula=matricula).first()

        if user:
            user.delete()
            return JsonResponse({'message': f'Usuário com matrícula {matricula} foi deletado com sucesso.'}, status=200)
        else:
            return JsonResponse({'message': f'Usuário com matrícula {matricula} não foi encontrado.'}, status=404)

    return JsonResponse({'message': 'Metodo invalido! Use DELETE para deletar um usuario.'}, status=400)

@csrf_exempt
def alterar_papel(request, matricula):
    if request.method == 'PUT':
        try:
            user = User.objects.filter(matricula=matricula).first()

            if user:
                if user.role == 'adm':
                    user.role = 'tec'
                    user.save()
                    return JsonResponse({'message': f'Papel do usuário com matrícula {matricula} foi alterado para tec.'}, status=200)
                elif user.role == 'tec':
                    user.role = 'adm'
                    user.save()
                    return JsonResponse({'message': f'Papel do usuário com matrícula {matricula} foi alterado para adm.'}, status=200)
                else:
                    return JsonResponse({'message': f'Usuário com matrícula {matricula} não é nem adm nem tec.'}, status=400)
            else:
                return JsonResponse({'message': f'Usuário com matrícula {matricula} não foi encontrado.'}, status=404)
        except:
            return JsonResponse({'message': 'Erro ao alterar o papel do usuário.'}, status=500)

    return JsonResponse({'message': 'Método inválido! Use PUT para alterar o papel de um usuário.'}, status=400)

