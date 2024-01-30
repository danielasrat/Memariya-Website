const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user'));

const id = user.id;

const displayTutorsBtn = document.getElementById('displayTutorsBtn');
const tutorsContainer = document.getElementById('tutorsContainer');

const premium = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/students/${id}/premium`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
        })
        const data = await response.json();
        // console.log(data,typeof data);
        if (response.status !== 200 ) {
            alert(data.msg);
            premium()
        } else if (data !== true) {
            alert('You need to be a premium user to access this page');
            window.location.href = '../HTML/buy-premium.html';
        }

    }catch (error) {
        alert(error.message);
    }
}
premium();
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
                <div class="flex items-center">
                    <div class="fas fa-user text-black text-3xl w-1"> </div>
                    <div class="ml-20 ">
                        <h3 class="text-lg font-bold">${tutor.name}</h3>
                        <div>Expertise: ${selectedCourse}</div>
                        <div>Bio: ${tutor.bio}</div>
                        <div>Average Rating: ${tutor.rate.toFixed(1)}</div>
                        <div>HourlyRate: ${tutor.hourlyRate}$</div>
                        <div>Contact Info: Email: <a href= 'mailto:${tutor.email}'>${tutor.email}</a></div>
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