
const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user'));

const id = user.id;
const Username = user.name;
// console.log(id);

const submitAnswer = document.getElementById('submitAnswer');
const container = document.getElementById('container');

document.getElementById('UserName').innerHTML = `${Username}`;
document.getElementById('Username').innerHTML = `<em class="font-bold text-lg">Username</em>: ${Username}`;


function setCourseName(name) {
    localStorage.setItem("courseName", name);
}   


async function addCourse(courseid,name) {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/students/${id}/courses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                name,
                id: courseid,
                level : "Beginner"
            })
        });
        const data = await response.json();
        if (response.status !== 200) {
            throw new Error(data.msg)
        } 
        alert(`${name} Beginner course added successfully`);
    } catch (error) {
        alert(error.message);
    }
}