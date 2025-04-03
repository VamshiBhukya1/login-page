// app.js

// Get registered users from localStorage
function getUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users;
}

// Save users to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Login functionality
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    const users = getUsers();
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        window.location.href = 'users.html'; // Redirect to users page
    } else {
        errorMessage.textContent = 'Invalid email or password.';
    }
});

// Sign Up functionality
document.getElementById('signupForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const errorMessage = document.getElementById('signup-error-message');
    
    const users = getUsers();
    
    // Check if email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        errorMessage.textContent = 'Email already registered. Please log in.';
        return;
    }
    
    // Add new user
    const newUser = { name, email, password };
    users.push(newUser);
    saveUsers(users);
    
    // Redirect to login page after successful registration
    window.location.href = 'index.html';
});

// Display registered users on the users page
window.onload = function() {
    if (document.getElementById('userList')) {
        const users = getUsers();
        const userList = document.getElementById('userList');
        
        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = user.name;
            userList.appendChild(listItem);
        });
    }
};
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobileNumber = document.getElementById('mobileNumber').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const errorMessage = document.getElementById('error-message');

    if (fullName === '' || email === '' || mobileNumber === '' || password === '' || confirmPassword === '') {
        errorMessage.textContent = 'All fields are required.';
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match.';
        return;
    }

    if (!document.getElementById('terms').checked) {
        errorMessage.textContent = 'You must agree to the terms and conditions.';
        return;
    }

    // Proceed with form submission or AJAX request
    errorMessage.textContent = '';
    alert('Registration successful!');
    // Redirect or further processing here
});
