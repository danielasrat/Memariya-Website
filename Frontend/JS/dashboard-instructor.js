const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));
const id = user.id;
const role = user.role;
const Username = user.name;


document.getElementById('UserName').innerHTML = `${Username}`;
document.getElementById('userRole').innerHTML = `<em class="font-bold text-lg">Profile</em >: ${role}`;
document.getElementById('Username').innerHTML = `<em class="font-bold text-lg">Username</em>: ${Username}`;



const level = {
    Beginner: 0,
    Intermediate: 1,
    Advanced: 2
}

function goToFinal(name, id) {
    const courseSelect = document.getElementById(`courseSelect${name}`);
    id += level[courseSelect.value]
    localStorage.setItem('courseId', id);
    window.location.href = '../Html/final.html';
}