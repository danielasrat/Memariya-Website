const token = localStorage.getItem('token') || 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MSwibmFtZSI6InRlc3QyIiwicm9sZSI6IlN0dWRlbnQiLCJpYXQiOjE3MDY1ODIyODMsImV4cCI6MTcwOTE3NDI4M30.I-4Hpyq4Mv1sZ4OiLTC_kDaKDdmS4cW8OSsMgnbpZx0'
const id = localStorage.getItem('id') || 1;
// const courseId = localStorage.getItem('courseId') || 0;

const submitAnswer = document.getElementById('submitAnswer');
const container = document.getElementById('container');

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