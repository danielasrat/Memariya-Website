
const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user'));

const id = user.id;

const buybutton = document.getElementById('buypremium');

const buyPremium = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/students/${id}/premium`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            },
        })
        const data = await response.json();
        if (response.status !== 200 ) {
            throw new Error(data.msg);
        }
        alert("You are now a premium user");
        location.href = '../HTML/find-tutors.html';
    } catch (error) {
        alert(error.message);
        }
            
}
buybutton.addEventListener('click', async (event) => {
    event.preventDefault();
    buyPremium();
});
