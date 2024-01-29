const buybutton = document.getElementById('buypremium');
const token = localStorage.getItem('token') || 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MSwibmFtZSI6InRlc3QyIiwicm9sZSI6IlN0dWRlbnQiLCJpYXQiOjE3MDY1Mjc2ODQsImV4cCI6MTcwOTExOTY4NH0.pZTbZV_nt_Oyewqyatz-IB4zonb4po_IAK_P9jmtnqM'
const id = localStorage.getItem('id') || 0;

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
