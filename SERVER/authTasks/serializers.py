from rest_framework import serializers

from authTasks.models import Todo


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'status', 'assignees', 'assigner', 'created_at', 'updated_at', 'comentariofinal', 'pausado')
