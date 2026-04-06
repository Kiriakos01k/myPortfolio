const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    formStatus.innerHTML = "Sending...";
    formStatus.style.color = "#555";

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: json
        });

        const result = await response.json();

        if (result.success) {
            formStatus.innerHTML = "Message sent successfully!";
            formStatus.style.color = "green";
            form.reset();
        } else {
            formStatus.innerHTML = "Something went wrong. Please try again.";
            formStatus.style.color = "red";
        }
    } catch (error) {
        formStatus.innerHTML = "Network error. Please try again later.";
        formStatus.style.color = "red";
    }
});

// Dark Mode Toggle
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
}

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    const isDark = body.classList.contains("dark-mode");

    if (isDark) {
        localStorage.setItem("theme", "dark");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    } else {
        localStorage.setItem("theme", "light");
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    }
});