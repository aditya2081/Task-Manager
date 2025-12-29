from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .models import Task
from .forms import TaskForm


def task_list(request):
    """Display all tasks"""
    tasks = Task.objects.all()
    
    # Calculate statistics
    total_tasks = tasks.count()
    completed_tasks = tasks.filter(status='completed').count()
    high_priority_tasks = tasks.filter(priority='high').count()
    active_tasks = tasks.exclude(status='completed').count()
    
    # Filter by status if requested
    status_filter = request.GET.get('status')
    if status_filter:
        tasks = tasks.filter(status=status_filter)
    
    # Filter by priority if requested
    priority_filter = request.GET.get('priority')
    if priority_filter:
        tasks = tasks.filter(priority=priority_filter)
    
    # Calculate progress percentage
    filtered_count = tasks.count()
    progress_percentage = (filtered_count / total_tasks * 100) if total_tasks > 0 else 0
    
    context = {
        'tasks': tasks,
        'status_filter': status_filter,
        'priority_filter': priority_filter,
        'total_tasks': total_tasks,
        'completed_tasks': completed_tasks,
        'high_priority_tasks': high_priority_tasks,
        'active_tasks': active_tasks,
        'filtered_count': filtered_count,
        'progress_percentage': progress_percentage,
    }
    return render(request, 'tasks/task_list.html', context)


def task_detail(request, pk):
    """Display a single task"""
    task = get_object_or_404(Task, pk=pk)
    context = {'task': task}
    return render(request, 'tasks/task_detail.html', context)


def task_create(request):
    """Create a new task"""
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            task = form.save()
            messages.success(request, f'Task "{task.title}" created successfully!')
            return redirect('task_list')
    else:
        form = TaskForm()
    
    context = {'form': form, 'title': 'Create Task'}
    return render(request, 'tasks/task_form.html', context)


def task_update(request, pk):
    """Update an existing task"""
    task = get_object_or_404(Task, pk=pk)
    
    if request.method == 'POST':
        form = TaskForm(request.POST, instance=task)
        if form.is_valid():
            task = form.save()
            messages.success(request, f'Task "{task.title}" updated successfully!')
            return redirect('task_detail', pk=task.pk)
    else:
        form = TaskForm(instance=task)
    
    context = {'form': form, 'title': 'Update Task', 'task': task}
    return render(request, 'tasks/task_form.html', context)


def task_delete(request, pk):
    """Delete a task"""
    task = get_object_or_404(Task, pk=pk)
    
    if request.method == 'POST':
        task_title = task.title
        task.delete()
        messages.success(request, f'Task "{task_title}" deleted successfully!')
        return redirect('task_list')
    
    context = {'task': task}
    return render(request, 'tasks/task_confirm_delete.html', context)
