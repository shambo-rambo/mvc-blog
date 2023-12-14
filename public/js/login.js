// login.js
document.addEventListener('DOMContentLoaded', (event) => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
  
        // Collect the form data
        const formData = {
          username: document.getElementById('username').value,
          password: document.getElementById('password').value
        };
  
        // Send the form data to the server
        fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed.');
            }
              return response.json();
            })
        .then(data => {
          // If login is successful, redirect to the dashboard
          if (data.message === 'You are now logged in!') {
            window.location.href = '/dashboard';
          } else {
            // Handle login failure (e.g., show an error message)
            alert('Login failed: ' + data.message);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Login failed. Error: ' + error.message);
        });
      });
    }
  });
  