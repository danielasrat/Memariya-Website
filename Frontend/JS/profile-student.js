const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user'));

const {id, email, name: userName,role} = user;
const courseId = localStorage.getItem('courseId')

const api = role === 'Instructor' ? 'instructors' : 'students'


document.getElementById('userEmail').innerHTML = email;
document.getElementById('userName').innerHTML = userName;
document.getElementById('UserName').innerHTML = `Welcome ${userName}`;

if (role === 'Instructor') {
    document.getElementById('dashBoardlg').href = `./dashboard-instructor.html`;
    document.getElementById('dashBoardsm').href = `./dashboard-instructor.html`;
    document.getElementById('userBio').innerHTML = `Bio: ${user.bio}`
    getRate()

} else { 
    document.getElementById('dashBoardlg').href = `./dashboard-student.html`;
    document.getElementById('dashBoardsm').href = `./dashboard-student.html`;
    document.getElementById('userBio').style.display = 'none'
    document.getElementById('updateBioDiv').style.display = 'none'
    document.getElementById('rating').style.display = 'none'     


}

// localStorage.setItem('test', JSON.stringify({ name: 'test', email: 'email' }))
// let test = JSON.parse(localStorage.getItem('test'))


async function updateName() { 
    try {  
        const response = await fetch(`http://localhost:3000/api/v1/${api}/${id}`, {
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
        const response = await fetch(`http://localhost:3000/api/v1/${api}/${id}`, {
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
async function updateBio() {
    try { 
        const response = await fetch(`http://localhost:3000/api/v1/${api}/${id}`, {
            method: 'PATCH',
            headers: {
                'content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                bio: document.getElementById('newBio').value,
            })
            
        })
        const data = await response.json()
        if (response.status !== 200) throw new Error(data.msg)
        user.bio = data.bio
        localStorage.setItem('user',JSON.stringify(user))

        location.reload()
    } catch (error) {
        document.getElementById('updateEmailError').innerHTML = error.message

    }
}
 
async function getRate() {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/${api}/${id}/rate`, {
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
                'Authorization': token
            }
        })
        const data = await response.json()
        if (response.status !== 200) throw new Error(data.msg)
        // console.log(data)
        document.getElementById('rating').innerHTML = `Rating: ${data}`        
        return data
    } catch (error) {
        return console.log(error.message)
    }
 }