const { auth } = require('./auth.js');
const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user'));
auth(token, user);

const {id, email, name: studentName} = user;
const courseId = localStorage.getItem('courseId')

document.getElementById('studentEmail').innerHTML = email;
document.getElementById('studentName').innerHTML = studentName;
document.getElementById('StudentName').innerHTML = `Welcome ${studentName}`;

// localStorage.setItem('test', JSON.stringify({ name: 'test', email: 'email' }))
// let test = JSON.parse(localStorage.getItem('test'))


async function updateName() { 
    try {  
        const response = await fetch(`http://localhost:3000/api/v1/students/${id}`, {
            method: 'PATCH',
            headers: {
                'content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                name: document.getElementById('newName').value,
            })
        })
        const data = await response.json()

        if (response.status !== 200) throw new Error(data.msg)
        user.name = data.name
        localStorage.setItem('user',JSON.stringify(user))
        location.reload()
        
    } catch (error) {
        document.getElementById('updateNameError').innerHTML = error.message
    }
}
async function updateEmail() { 
    try {  
        const response = await fetch(`http://localhost:3000/api/v1/students/${id}`, {
            method: 'PATCH',
            headers: {
                'content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                email: document.getElementById('newEmail').value,
            })
        })
        const data = await response.json()
        if (response.status !== 200) throw new Error(data.msg)
        user.email = data.email
        localStorage.setItem('user',JSON.stringify(user))

        location.reload()
        
    } catch (error) {
        document.getElementById('updateEmailError').innerHTML = error.message
     }
}