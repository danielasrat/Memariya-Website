
const token = localStorage.getItem('token') || 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MSwibmFtZSI6InRlc3QyIiwicm9sZSI6IlN0dWRlbnQiLCJpYXQiOjE3MDY1ODIyODMsImV4cCI6MTcwOTE3NDI4M30.I-4Hpyq4Mv1sZ4OiLTC_kDaKDdmS4cW8OSsMgnbpZx0'
const id = localStorage.getItem('id') || 1;
const courseId = localStorage.getItem('courseId') || 0;
const studentName = localStorage.getItem('studentName') || 'test2';

const container = document.getElementById('container');
// console.log(id, token, courseId, container.innerHTML)

const currentDate = new Date();
        
        // Format the date as yyyy-mm-dd
const formattedDate = currentDate.toISOString().split('T')[0];


const getCertificate = async () => { 
    try { 
        const response = await fetch(`http://localhost:3000/api/v1/students/${id}/certificates`, {
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
        const form = data.map(certificate => {
            return `<div class="certificate-1 border-2 border-blue-500 p-6 rounded-lg mt-8">
                        <p class="text-xl font-semibold">Course: ${certificate.name}</p>
                        <p class="text-lg">Level: ${certificate.level}</p>
                        <p class="text-md mt-4">This is to certify that</p>
                        <p class="text-2xl font-bold">[${studentName}]</p>
                        <p class="text-md mt-2">has successfully completed the above-mentioned course with great dedication
                            and commitment.</p>
                        <p class="text-lg mt-4">Issued on: [${formattedDate}]</p>
                    </div>
            `
        }).join('');
        container.innerHTML = form
    
    } catch (error) { return error.message }
}
getCertificate();