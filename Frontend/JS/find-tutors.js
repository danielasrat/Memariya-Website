const displayTutorsBtn = document.getElementById('displayTutorsBtn');
displayTutorsBtn.addEventListener('click', async (event) => { 
    event.preventDefault();
    const selectedCourse = document.getElementById('courseSelect').value;
    if (selectedCourse !== '') {
        const response = await fetch('http://localhost:3000/api/v1/instructors', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MSwibmFtZSI6InRlYWNoIiwicm9sZSI6Ikluc3RydWN0b3IiLCJpYXQiOjE3MDY1MTk1ODEsImV4cCI6MTcwOTExMTU4MX0.kGgWIFqKNZubWkuhwGv_eWlA1vQmi8stKa95-pmIEcE'

            },
        });
        const data = await response.json();
        console.log(data);
    }
})