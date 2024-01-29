document.getElementById('displayTutorsBtn').addEventListener('click', () => {
    const selectedCourseId = document.getElementById('courseSelect').value;

    // Check if a course is selected
    if (selectedCourseId) {
        // Fetch tutors based on the selected course
        fetch(`http://localhost:3000/api/v1/tutors?courseId=${selectedCourseId}`)
            .then(response => response.json())
            .then(tutors => {
                const tutorsContainer = document.getElementById('tutorsContainer');
                tutorsContainer.innerHTML = ''; // Clear previous content

                // Iterate through each tutor and create HTML elements
                tutors.forEach(tutor => {
                    const tutorDiv = document.createElement('div');
                    tutorDiv.classList.add('flex', 'items-center', 'border', 'p-4', 'rounded', 'mb-4');

                    const profileImageDiv = document.createElement('div');
                    profileImageDiv.classList.add('w-16', 'h-16', 'bg-black', 'mr-4', 'rounded-full');
                    // You may want to add a profile image in the 'profileImageDiv' later

                    const detailsDiv = document.createElement('div');
                    detailsDiv.classList.add('ml-4');

                    const nameHeader = document.createElement('h3');
                    nameHeader.classList.add('text-lg', 'font-bold');
                    nameHeader.textContent = tutor.name;

                    const expertiseParagraph = document.createElement('p');
                    expertiseParagraph.textContent = `Expertise: ${tutor.expertise}`;

                    const usernameParagraph = document.createElement('p');
                    usernameParagraph.textContent = `Username: ${tutor.username}`;

                    const ratingParagraph = document.createElement('p');
                    ratingParagraph.textContent = `Average Rating: ${tutor.rating.count > 0 ? tutor.rating.users[0] : 'N/A'}`;

                    const contactInfoParagraph = document.createElement('p');
                    contactInfoParagraph.textContent = `Contact Info: ${tutor.email}`;

                    // Append elements to their respective parents
                    detailsDiv.appendChild(nameHeader);
                    detailsDiv.appendChild(expertiseParagraph);
                    detailsDiv.appendChild(usernameParagraph);
                    detailsDiv.appendChild(ratingParagraph);
                    detailsDiv.appendChild(contactInfoParagraph);

                    tutorDiv.appendChild(profileImageDiv);
                    tutorDiv.appendChild(detailsDiv);

                    // Append the tutor details to the container
                    tutorsContainer.appendChild(tutorDiv);
                });
            })
            .catch(error => {
                console.error('Error fetching tutors:', error);
            });
    }
});