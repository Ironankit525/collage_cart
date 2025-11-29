// Theme toggle functionality
const STORAGE_THEME = 'login_theme';

function applyThemeFromStorage() {
    const theme = localStorage.getItem(STORAGE_THEME) || 'light';
    if (theme === 'dark') {
        document.body.classList.add('dark');
        updateThemeIcon(true);
    } else {
        document.body.classList.remove('dark');
        updateThemeIcon(false);
    }
}

function updateThemeIcon(isDark) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = isDark ? '☀️' : '🌙';
    }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    applyThemeFromStorage();
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark');
            localStorage.setItem(STORAGE_THEME, isDark ? 'dark' : 'light');
            updateThemeIcon(isDark);
        });
    }
});

// Signup form handler
function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const collegeCode = document.getElementById('college-code').value;
    const confirmCode = document.getElementById('confirm-code').value;
    const terms = document.getElementById('terms').checked;
    
    // Validation
    if (!name) {
        alert('Please enter your full name');
        return;
    }
    
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }
    
    if (collegeCode.length < 6) {
        alert('College code must be at least 6 characters long');
        return;
    }
    
    if (collegeCode !== confirmCode) {
        alert('College codes do not match. Please try again.');
        document.getElementById('confirm-code').focus();
        return;
    }
    
    if (!terms) {
        alert('Please agree to the Terms & Conditions');
        return;
    }
    
    // Store user data (in a real app, this would be sent to a server)
    const userData = {
        name: name,
        email: email,
        phone: phone || null,
        collegeCode: collegeCode,
        createdAt: new Date().toISOString()
    };
    
    // Store in localStorage (for demo purposes)
    const existingUsers = JSON.parse(localStorage.getItem('college_cart_users') || '[]');
    
    // Check if email already exists
    const emailExists = existingUsers.some(user => user.email === email);
    if (emailExists) {
        alert('An account with this email already exists. Please sign in instead.');
        window.location.href = './login.html';
        return;
    }
    
    existingUsers.push(userData);
    localStorage.setItem('college_cart_users', JSON.stringify(existingUsers));
    
    // Show success message
    alert('Account created successfully! Redirecting to login...');
    
    // Redirect to login page after a short delay
    setTimeout(() => {
        window.location.href = './login.html';
    }, 1000);
}

