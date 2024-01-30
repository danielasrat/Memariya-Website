const token = localStorage.getItem('token') || 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MCwibmFtZSI6InRlc3QiLCJyb2xlIjoiU3R1ZGVudCIsImlhdCI6MTcwNjU3NDU2MiwiZXhwIjoxNzA5MTY2NTYyfQ.mXy84L4mMVPgVFrbGCsuFZaMP0vDReG66Bva-Y64R6s'
const id = localStorage.getItem('id') || 1;
const courseId = localStorage.getItem('courseId') || 0;

const container = document.getElementById('container');
// console.log(id, token, courseId, container.innerHTML)
const getCourse = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/courses/${courseId}`, {
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
                'Authorization': token

            }
        })
        const data = await response.json();
        // console.log(data)
        const progress = await getCourses();
        const rate = progress.length / 3 * 100;
        if (response.status !== 200) throw new Error(data.msg);
        container.innerHTML = `
        <section class="sm:ml-10">
            <h1 class="text-center font-bold text-3xl text-blue-700">${data.name} ${data.level}</h1>
            <p class="text-lg mt-4 text-gray-700">${data.description}<br>
                Explore the course through 3 exciting milestones, each culminating in a quiz. 🚀<br>
                Successful completion of all quizzes leads to earning the final certificate. 🏆</p>
            <p class="text-lg mt-4 text-gray-700">All the necessary materials can be found in the course materials link.<br>
                Navigate your learning journey using the provided file, guiding you seamlessly through the materials.</p>
        </section>

        <div class="mb-4 mt-4">
                <h3 class="text-sm font-semibold mb-1">Course Progress</h3>
                <progress class="w-full" value="${rate}" max="100"></progress>
                <p class="text-xs text-gray-600 mt-1">${rate.toFixed(1)}% Complete</p>
        </div>

    
        <!-- Course Materials Section -->
        <section class="mt-4">
            <div class="text-center">
                <a href="${data.resource}" class="bg-custom pt-2 pb-2 pr-3 pl-3 text-white rounded-md self-center hover:bg-customdark">
                    Course Materials</a>
            </div>
    
            <!-- Achieve Milestones Section -->
            <h3 class="text-lg mt-4 font-semibold lg:-ml-40">Achieve milestones by taking the Quizzes below!</h3>
            <div class="flex flex-col items-start text-lg mt-4">
                <div>
                    <p ${isCompleted(1,progress) === true ? 'text-green-500' : 'text-red-500'}>Milestone 1 :${isCompleted(1,progress) === true? 'Completed' : 'Not Completed'}</p>
                    <button onclick="getQuiz(${1})" class="bg-custom px-3 rounded-xl lg:ml-20 mt-3 mb-3">
                        <a href="#" class="text-white">Quiz Me</a>
                    </button>
                </div>
                <div>
                    <p ${isCompleted(2,progress) === true ? 'text-green-500' : 'text-red-500'}>Milestone 2 :${isCompleted(2,progress) === true? 'Completed' : 'Not Completed'}</p>
                    <button onclick="getQuiz(${2})" class="bg-custom px-3 rounded-xl lg:ml-20 mt-3 mb-3">
                        <a href="#" class="text-white">Quiz Me</a>
                    </button>
                </div>
                <div>
                    <p ${isCompleted(3,progress) === true? 'text-green-500' : 'text-red-500'}>Milestone 3 :${isCompleted(3,progress) === true? 'Completed' : 'Not Completed'}</p>
                    <button onclick="getQuiz(${3})" class="bg-custom px-3 rounded-xl lg:ml-20 mt-3 mb-3">
                        <a href="#" class="text-white">Quiz Me</a>
                    </button>
                </div>
            </div>
        </section>
    
        <!-- Take Final Exam Section -->
        <section class="text-center mt-8 mb-8">
            <h3 class="text-2xl font-serif mb-4">Take final exam for memariya.com certification!</h3>
            <div>
                <button onclick="getFinal(${courseId})" class="bg-custom px-3 rounded-xl lg:ml-20 mt-3 mb-3">
                    <a href="#" class="text-white">Take Final Exam</a>
                </button>
            </div>
        </section>
        `
    } catch (error) { container.innerHTML = error.message; }
}

getCourse();

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
        // console.log(data)
        const course = data.find(course => course.id === Number(courseId));
        return course.progress
        
    } catch (error) {
        return [];
    }
}
function getQuiz(milestone) {
    localStorage.setItem('milestone', milestone);
    window.location.href = '../Html/quiz.html';
}

function getFinal(id) {
    localStorage.setItem('finalId', id);
    window.location.href = '../Html/final.html';
}
function isCompleted(milestone, progress) {
    for (mile of progress) {
        if (mile === milestone){return true}
    };
    return false;
}