function getTokenInfo(token) {
    try {
        const actualToken = token.split(' ')[1];
        
        const tokenPayload = JSON.parse(atob(actualToken.split('.')[1]));
        
        if (tokenPayload.exp && tokenPayload.role) {
            const expirationDate = new Date(tokenPayload.exp * 1000);
            const role = tokenPayload.role;
            return [expirationDate, role];
        }
    } catch (error) {
        console.log('Error parsing token:', error);
    }
    return [null, null];
}

const token = localStorage.getItem('token');
if (token) {
    const [expirationDate, role] = getTokenInfo(token);
    if (expirationDate && expirationDate > new Date()) {
        
        if (role === 'Student') {
            window.location.href = "../Html/dashboard-student.html";
        } else {
            window.location.href = "../Html/dashboard-instructor.html";
        }
    }
}

const button = document.getElementById('signIn');
button.addEventListener('click', login);

// Login function
async function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.querySelector('input[name="role"]:checked').value;

    try {
        const endPoint = "http://localhost:3000/api/v1/auth/login";
        const response = await fetch(endPoint, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                role
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });
        
        const data = await response.json();
        if (response.status === 200) {
            localStorage.setItem('token', `Bearer ${data.token}`);

            if (role === "Student") {
                window.location.href = "../Html/dashboard-student.html";
            } else {
                window.location.href = "../Html/dashboard-instructor.html";
            }
        } else {
            throw new Error(data.msg)
        }

    } catch (error) {
        alert(error.message)
        window.location.href = './log-in.html';
    }
    
}
