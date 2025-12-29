# Task Manager Pro

A modern, full-stack task management web application built with Django.

## Features

- ✨ Beautiful and modern UI/UX with gradient designs
- 📝 Complete CRUD operations (Create, Read, Update, Delete)
- 🎯 Task prioritization (Low, Medium, High)
- 📊 Task status tracking (To Do, In Progress, Completed)
- 📅 Due date management with overdue detection
- 🔍 Filter tasks by status and priority
- 📱 Responsive design for all devices
- 🎨 Bootstrap 5 with custom styling

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd task-management
```

2. Create a virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On macOS/Linux
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

6. Run the development server:
```bash
python manage.py runserver
```

7. Open your browser and visit: `http://localhost:8000`

## Deployment

### Deploy to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the build command: `pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput`
4. Set the start command: `gunicorn taskmanager.wsgi:application`
5. Add environment variables as needed
6. Deploy!

### Deploy to Railway

1. Install Railway CLI or use the web interface
2. Run `railway login`
3. Run `railway init`
4. Run `railway up`
5. Your app will be deployed!

## Technologies Used

- Django 4.2
- Bootstrap 5
- SQLite (development) / PostgreSQL (production)
- HTML5, CSS3, JavaScript
- Gunicorn (production server)
- WhiteNoise (static files)

## License

MIT License
