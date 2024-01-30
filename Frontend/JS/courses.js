
const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user'));

const id = user.id;

const container = document.getElementById('container');
console.log(id,token)
const getCourses = async () => { 
    try {
        const response = await fetch(`http://localhost:3000/api/v1/students/${id}/courses`, {
            method: 'GET',
            headers: {
                'content-Type': 'application/json', 
                'Authorization': token
            }
        
        })
        const data = await response.json();
        if (response.status !== 200) {
            throw new Error(data.msg)
        }
        console.log(data)
        const courses = data.map(course => { 
            const rate = course.progress.length/3*100
            return `<div class="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-lg my-8 p-4 w-96">
            <h2 class="text-xl font-bold mb-2">${course.name} ${course.level} Level</h2>
        
            <!-- Progress Bar Section -->
            <div class="mb-4">
                <h3 class="text-sm font-semibold mb-1">Course Progress</h3>
                <progress class="w-full" value="${rate}" max="100"></progress>
                <p class="text-xs text-gray-600 mt-1">${rate.toFixed(1)}% Complete</p>
            </div>
        
            <!-- Access Course Materials Button -->
            <button onclick="goToCourse(${course.id})" class="bg-custom py-2 px-4 text-white rounded-md inline-block hover:bg-customdark">Access Course</button>
        </div>
            `
        });
        container.innerHTML = courses.join('');
    } catch (error) {
        container.innerHTML = `<h1>${error.message}</h1>`

        
      }
}
getCourses();


async function goToCourse(id) {
    localStorage.setItem('courseId', id);
    window.location.href = '../Html/course.html';
    
}