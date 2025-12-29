// TaskFlow Pro - Premium Interactions

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Card tilt effect
document.querySelectorAll('.task-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        this.style.transition = 'transform 0.1s';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// Smooth scroll for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation enhancement
document.querySelectorAll('form').forEach(form => {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });
    });
});

// Add loading animation to forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Processing...';
            submitBtn.disabled = true;
        }
    });
});

// Task Alarm Notification System
class TaskAlarmSystem {
    constructor() {
        this.notifiedTasks = new Set(JSON.parse(localStorage.getItem('notifiedTasks') || '[]'));
        this.checkInterval = 30000; // Check every 30 seconds for more responsiveness
        this.init();
    }

    init() {
        console.log('🔔 Task Alarm System Initialized');
        
        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                console.log('Notification permission:', permission);
            });
        }

        // Start checking for due tasks immediately and then at intervals
        this.checkDueTasks();
        setInterval(() => this.checkDueTasks(), this.checkInterval);
    }

    checkDueTasks() {
        const now = new Date();
        const tasks = document.querySelectorAll('[data-task-due-date]');
        
        console.log(`⏰ Checking ${tasks.length} tasks at ${now.toLocaleTimeString()}`);

        tasks.forEach(taskElement => {
            const taskId = taskElement.getAttribute('data-task-id');
            const dueDateStr = taskElement.getAttribute('data-task-due-date');
            const taskTitle = taskElement.getAttribute('data-task-title');
            const taskStatus = taskElement.getAttribute('data-task-status');

            if (!dueDateStr) {
                return;
            }

            // Parse the date - handle both datetime and date formats
            const dueDate = new Date(dueDateStr);
            
            // Skip if task is completed or already notified
            if (taskStatus === 'completed' || this.notifiedTasks.has(taskId)) {
                return;
            }

            // Check if task is due (within 15 minutes or overdue)
            const timeDiff = dueDate - now;
            const minutesDiff = Math.floor(timeDiff / 60000);

            console.log(`Task "${taskTitle}": Due ${dueDate.toLocaleString()}, Minutes until due: ${minutesDiff}`);

            // Notify if due within 15 minutes or up to 2 hours overdue
            if (minutesDiff <= 15 && minutesDiff >= -120) {
                console.log(`🔔 Triggering notification for task: ${taskTitle}`);
                this.notifyTask(taskId, taskTitle, dueDate, minutesDiff);
            }
        });
    }

    notifyTask(taskId, title, dueDate, minutesDiff) {
        // Mark as notified
        this.notifiedTasks.add(taskId);
        localStorage.setItem('notifiedTasks', JSON.stringify([...this.notifiedTasks]));

        // Play alarm sound
        this.playAlarmSound();

        // Show browser notification
        this.showNotification(title, minutesDiff);

        // Show in-page alert
        this.showInPageAlert(title, minutesDiff);
    }

    playAlarmSound() {
        // Create a beep sound using Web Audio API for better compatibility
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);

            // Play three beeps
            setTimeout(() => {
                const osc2 = audioContext.createOscillator();
                const gain2 = audioContext.createGain();
                osc2.connect(gain2);
                gain2.connect(audioContext.destination);
                osc2.frequency.value = 800;
                osc2.type = 'sine';
                gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
                gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                osc2.start(audioContext.currentTime);
                osc2.stop(audioContext.currentTime + 0.5);
            }, 200);

            setTimeout(() => {
                const osc3 = audioContext.createOscillator();
                const gain3 = audioContext.createGain();
                osc3.connect(gain3);
                gain3.connect(audioContext.destination);
                osc3.frequency.value = 800;
                osc3.type = 'sine';
                gain3.gain.setValueAtTime(0.3, audioContext.currentTime);
                gain3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                osc3.start(audioContext.currentTime);
                osc3.stop(audioContext.currentTime + 0.5);
            }, 400);

            console.log('🔊 Alarm sound played');
        } catch (e) {
            console.error('Failed to play sound:', e);
        }
    }

    showNotification(title, minutesDiff) {
        if ('Notification' in window && Notification.permission === 'granted') {
            const message = minutesDiff <= 0 
                ? `Task "${title}" is overdue by ${Math.abs(minutesDiff)} minutes!` 
                : `Task "${title}" is due in ${minutesDiff} minutes!`;

            const notification = new Notification('⏰ Task Reminder - TaskFlow Pro', {
                body: message,
                icon: '/static/favicon.ico',
                badge: '/static/favicon.ico',
                requireInteraction: true,
                tag: `task-${title}`
            });

            notification.onclick = function() {
                window.focus();
                this.close();
            };

            console.log('📱 Browser notification shown');
        } else {
            console.log('Browser notifications not available or not permitted');
        }
    }

    showInPageAlert(title, minutesDiff) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'task-alarm-alert';
        
        const isOverdue = minutesDiff <= 0;
        const timeText = isOverdue 
            ? `Overdue by ${Math.abs(minutesDiff)} minutes!`
            : `Due in ${minutesDiff} minutes!`;
        
        alertDiv.innerHTML = `
            <div class="alarm-icon">⏰</div>
            <div class="alarm-content">
                <h4>Task Reminder</h4>
                <p><strong>${title}</strong></p>
                <p style="color: ${isOverdue ? '#ef4444' : '#f59e0b'}; font-weight: 600; margin-top: 5px;">
                    ${timeText}
                </p>
            </div>
            <button class="alarm-close" onclick="this.parentElement.remove()">×</button>
        `;

        document.body.appendChild(alertDiv);
        console.log('💬 In-page alert shown');

        // Auto-remove after 15 seconds
        setTimeout(() => {
            if (alertDiv.parentElement) {
                alertDiv.style.animation = 'slideOut 0.5s ease-out forwards';
                setTimeout(() => alertDiv.remove(), 500);
            }
        }, 15000);
    }

    clearNotification(taskId) {
        this.notifiedTasks.delete(taskId);
        localStorage.setItem('notifiedTasks', JSON.stringify([...this.notifiedTasks]));
    }

    clearAllNotifications() {
        this.notifiedTasks.clear();
        localStorage.removeItem('notifiedTasks');
        console.log('All notifications cleared');
    }
}

// Initialize alarm system when page loads
let alarmSystem;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        alarmSystem = new TaskAlarmSystem();
    });
} else {
    alarmSystem = new TaskAlarmSystem();
}

// Add function to clear notifications (useful for testing)
window.clearTaskNotifications = function() {
    if (alarmSystem) {
        alarmSystem.clearAllNotifications();
        console.log('✅ All task notifications have been cleared. Refresh the page to check for notifications again.');
    }
};

// Animate stats on load
window.addEventListener('load', function() {
    document.querySelectorAll('.stats-badge').forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            stat.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            stat.style.opacity = '1';
            stat.style.transform = 'scale(1)';
        }, index * 100);
    });
});

// Console welcome message
console.log('%c TaskFlow Pro ', 'background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c Premium Task Management System ', 'color: #4facfe; font-size: 14px; font-weight: bold;');
