async function login() {
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5000/api/v1/logon', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, password })
    });

    const data = await response.json();

    if (response.ok) {
        console.log('Login successful:', data);
        alert(`Login successful! Token: ${data.token}`);
        // You can store the token in localStorage if needed
        // localStorage.setItem('token', data.token);
    } else {
        console.log('Login failed:', data);
        alert(`Login failed: ${data.message}`);
    }
}