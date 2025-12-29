# Task Manager Pro - Deployment Guide

Your Django task management application is ready! Here's how to deploy it to get a live link.

## Local Testing

Your application is currently running at: **http://localhost:8000**

## Deployment Options

### Option 1: Deploy to Railway (Recommended - Easy & Free)

Railway provides free hosting with automatic HTTPS and a live URL.

**Steps:**

1. **Install Git (if not already installed)**
   - Download from: https://git-scm.com/

2. **Initialize Git Repository**
   ```bash
   cd "d:\task management"
   git init
   git add .
   git commit -m "Initial commit: Task Manager Pro"
   ```

3. **Create GitHub Repository**
   - Go to https://github.com/new
   - Create a new repository named "task-manager-pro"
   - Don't initialize with README (we already have one)

4. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/task-manager-pro.git
   git branch -M main
   git push -u origin main
   ```

5. **Deploy to Railway**
   - Go to https://railway.app/
   - Sign up/Login with GitHub
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your "task-manager-pro" repository
   - Railway will automatically detect Django and deploy!
   - Your live URL will be: `https://your-app-name.up.railway.app`

### Option 2: Deploy to Render

1. **Push to GitHub** (follow steps 2-4 from Railway option)

2. **Deploy to Render**
   - Go to https://render.com/
   - Sign up/Login
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: task-manager-pro
     - **Environment**: Python 3
     - **Build Command**: `pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput`
     - **Start Command**: `gunicorn taskmanager.wsgi:application`
   - Click "Create Web Service"
   - Your live URL will be: `https://task-manager-pro.onrender.com`

### Option 3: Deploy to PythonAnywhere

1. **Sign up at** https://www.pythonanywhere.com/

2. **Upload your code**
   - Use the Files tab to upload your project
   - Or clone from GitHub

3. **Create a Web App**
   - Go to Web tab → Add a new web app
   - Choose Manual configuration
   - Select Python 3.11

4. **Configure WSGI file**
   - Edit the WSGI configuration file
   - Point it to your Django project

5. **Set up virtualenv**
   - Create and configure virtual environment
   - Install requirements

6. **Reload Web App**
   - Your live URL will be: `https://yourusername.pythonanywhere.com`

## Environment Variables (for Production)

When deploying, set these environment variables:

```
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=your-domain.com,.railway.app,.onrender.com
```

## Features of Your Application

✨ **Full CRUD Operations:**
- ✅ **Create** - Add new tasks with title, description, priority, status, and due date
- 📖 **Read** - View all tasks in a beautiful card layout or individual task details
- ✏️ **Update** - Edit any task's information
- 🗑️ **Delete** - Remove tasks with confirmation

🎨 **Beautiful UI/UX:**
- Modern gradient design
- Responsive layout (mobile, tablet, desktop)
- Bootstrap 5 components
- Smooth animations and transitions
- Icon-based interface

📊 **Task Management Features:**
- Priority levels: Low, Medium, High
- Status tracking: To Do, In Progress, Completed
- Due date with overdue detection
- Filter by status and priority
- Task cards with color-coded badges

## Quick Start Commands

**Run locally:**
```bash
cd "d:\task management"
.\venv\Scripts\activate
python manage.py runserver
```

**Create admin user:**
```bash
python manage.py createsuperuser
```

**Access admin panel:**
http://localhost:8000/admin

## Support

For deployment issues, refer to:
- Railway Docs: https://docs.railway.app/
- Render Docs: https://render.com/docs
- Django Deployment: https://docs.djangoproject.com/en/4.2/howto/deployment/

---

**Your Task Manager Pro is ready to deploy! 🚀**
