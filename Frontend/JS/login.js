const loginButton = document.getElementById("signIn");
const inputEmail = document.getElementById("username");
const inputPassword = document.getElementById("password");
const role = document.querySelector('input[name="role"]:checked').value;


async function loginUser(email, password, role) {
    const loginEndpoint = "http://localhost:3000/api/v1/auth/login";

    try {
        const response = await fetch(loginEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                role: role
            }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        console.log("dhghgohg", response);
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", token);

        window.location.href = "dashboard.html";

    } catch (error) {
        alert("Error during login:", error.message);
    }
}

loginButton.addEventListener("click", () => {
    console.log("Email", inputEmail.value, "Password", inputPassword.value);
    loginUser(inputEmail.value, inputPassword.value, role);
});