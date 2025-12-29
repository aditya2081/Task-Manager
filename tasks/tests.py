from django.test import TestCase
from .models import Task


class TaskModelTest(TestCase):
    def test_task_creation(self):
        task = Task.objects.create(
            title='Test Task',
            description='Test Description',
            priority='high',
            status='todo'
        )
        self.assertEqual(task.title, 'Test Task')
        self.assertEqual(task.priority, 'high')
