const displayTutorsBtn = document.getElementById('displayTutorsBtn');
const tutorsContainer = document.getElementById('tutorsContainer');
console.log(tutorsContainer.innerHTML);
displayTutorsBtn.addEventListener('click', async (event) => { 
    event.preventDefault();
    const selectedCourse = document.getElementById('courseSelect').value;
    if (selectedCourse !== '') {
        const response = await fetch(`http://localhost:3000/api/v1/instructors?course=${selectedCourse}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MSwibmFtZSI6InRlYWNoIiwicm9sZSI6Ikluc3RydWN0b3IiLCJpYXQiOjE3MDY1MTk1ODEsImV4cCI6MTcwOTExMTU4MX0.kGgWIFqKNZubWkuhwGv_eWlA1vQmi8stKa95-pmIEcE'

            },
        });
        const data = await response.json();
        // console.log(data)
        const tutors = data.map(tutor => {
            return `<div class="flex items-center">
                <div class="w-16 h-16 bg-black mr-4 rounded-full"></div>
                <div class="ml-20">
                    <h3 class="text-lg font-bold">${tutor.name}</h3>
                    <p>Expertise: ${selectedCourse}</p>
                    <p>Username: ${tutor.name}</p>
                    <p>Average Rating: ${tutor.rate}</p>
                    <p>Contact Info: Email: ${tutor.email}</p>
                </div>
            </div>
            `
        });
        tutorsContainer.innerHTML = tutors.join('');
    }
})