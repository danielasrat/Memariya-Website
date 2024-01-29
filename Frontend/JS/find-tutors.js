const displayTutorsBtn = document.getElementById('displayTutorsBtn');
const tutorsContainer = document.getElementById('tutorsContainer');
const token = localStorage.getItem('token') || 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MSwibmFtZSI6InRlYWNoIiwicm9sZSI6Ikluc3RydWN0b3IiLCJpYXQiOjE3MDY1MjE3MDksImV4cCI6MTcwOTExMzcwOX0.v8EPXb2j_X3qCZrAKCj-_n5f13wiVo5FWrbmOQLkJG4'
console.log(tutorsContainer.innerHTML);
displayTutorsBtn.addEventListener('click', async (event) => { 
    event.preventDefault();
    const selectedCourse = document.getElementById('courseSelect').value;
    if (selectedCourse !== '') {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/instructors?course=${selectedCourse}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                },
            });
            const data = await response.json();
            // console.log(data)
            if (response.status !== 200) {
                throw new Error(data.msg);
            }
            const tutors = data.map(tutor => {
                return `
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="fas fa-user text-black text-3xl w-1"></div>
                    <div class="flex flex-col">
                        <h3 class="text-lg font-bold">${tutor.name}</h3>
                        <div>Expertise: ${selectedCourse}</div>
                        <div>Bio: ${tutor.bio}</div>
                        <div>Average Rating: ${tutor.rate.toFixed(1)}</div>
                        <div>Hourly Rate: ${tutor.hourlyRate}$</div>
                        <div>Contact Info: Email: <a href='mailto:${tutor.email}'>${tutor.email}</a></div>
                    </div>
                </div>

            `
            });
            tutorsContainer.innerHTML = tutors.join('');

        } catch (error) {
            alert(error.message);
        }
    }
})