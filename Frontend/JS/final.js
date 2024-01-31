
const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user'))

const id = user.id
const role = user.role

const courseId = localStorage.getItem('courseId')

const submitAnswer = document.getElementById('submitAnswer');
const rateCourse = document.getElementById('rateCourse');
const container = document.getElementById('container');
// console.log(id, token, courseId, container.innerHTML)

const getFinal = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/finals/${courseId}`, {
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
        let index = -1
        const form = data.map(obj => {
            const question = obj.question;
            const choice = obj.choice;
            index++;
            return `<fieldset class="mb-4">
                        <legend class="text-xl font-bold mb-4">${index + 1}. ${question}</legend>
                        <input required id="${index}1" type="radio" value="0" name="question${index + 1}" class="mx-8">
                        <label for="${index}1">${choice[0]}</label><br>
                        <input id="${index}2" type="radio" value="1" name="question${index + 1}" class="mx-8">
                        <label for="${index}2">${choice[1]}</label><br>
                        <input id="${index}3" type="radio" value="2" name="question${index + 1}" class="mx-8">
                        <label for="${index}3">${choice[2]}</label><br>
                        <input id="${index}4" type="radio" value="3" name="question${index + 1}" class="mx-8">
                        <label for="${index}4">${choice[3]}</label>
                    </fieldset>
            `
        }).join('');
        container.innerHTML = form

    } catch (error) { container.innerHTML = error.message; }

}
getFinal();

submitAnswer.addEventListener('click', async (e) => {
    e.preventDefault();
    const answers = [];
    for (let i = 0; i < 9; i++) {
        const answer = document.querySelector(`input[name="question${i + 1}"]:checked`)
        if (!answer) {
            alert(`Please answer question ${i + 1}`)
            return;
        }
        answers.push(answer.value);
    }
    alert('Your answer has been submitted')
    try {
        const response = await fetch(`http://localhost:3000/api/v1/finals/${courseId}`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ answer: answers })
        })
        const data = await response.json();
        if (response.status !== 200) {
            throw new Error(data.msg)
        }
        document.getElementById('result').innerHTML = `${data} of 9 correct!`;
        if (data > 7) {
            alert('Congratulations! You have passed the course')
            if (role === "Instructor") {
                alert('The Course is added to your badge')
                goBack();
            }

         }
        if (role === "Student" && data > 7 ) {
            document.getElementById('courseRate').style.display = 'Block';
            submitAnswer.style.display = 'none';
        }
    } catch (error) {
        alert(error.message)
    }

})


rateCourse.addEventListener('click', async (e) => { 
    e.preventDefault();
    try {
        const response = await fetch(`http://localhost:3000/api/v1/students/${id}/rate`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                courseId,
                rate: document.getElementById('rating').value
            })
        })
        const data = await response.json();
        if (response.status !== 200) {
            throw new Error(data.msg)
        }
        alert(data.msg)
        location.href = '../Html/certificates.html'
        
    } catch (error) {
        alert(error.message)
    }
})

function goBack() {
    if (user.role === 'Instructor') {
        window.location.href = '../Html/dashboard-instructor.html';
    } else {
        window.location.href = '../Html/course.html';
     }
}