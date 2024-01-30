const token = localStorage.getItem('token') || 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MSwibmFtZSI6InRlc3QyIiwicm9sZSI6IlN0dWRlbnQiLCJpYXQiOjE3MDY1ODIyODMsImV4cCI6MTcwOTE3NDI4M30.I-4Hpyq4Mv1sZ4OiLTC_kDaKDdmS4cW8OSsMgnbpZx0'
const id = localStorage.getItem('id') || 1;
const email = localStorage.getItem('studentEmail') || 'eba01@gmail.com'
const courseId = localStorage.getItem('courseId') || 0;
const studentName = localStorage.getItem('studentName') || 'test2';

document.getElementById('studentEmail').innerHTML = email;
document.getElementById('studentName').innerHTML = studentName;
document.getElementById('StudentName').innerHTML = studentName;

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
        console.log(data)
        if (response.status !== 200) throw new Error(data.msg)
        localStorage.setItem('studentName', data.name)
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
        localStorage.setItem('studentEmail', data.email)
        location.reload()
        
    } catch (error) {
        document.getElementById('updateEmailError').innerHTML = error.message
     }
}