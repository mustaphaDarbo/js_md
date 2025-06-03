
const form = document.getElementById("registrationForm");
const submitButton = form.querySelector("button");
const summaryCard = document.getElementById("summaryCard");

// Error message elements
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");

form.addEventListener("input", () => {
  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());

  // Validation checks
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
  const isValidPassword = /^(?=.*[0-9])(?=.*[\W_]).{8,}$/.test(values.password);
  const passwordsMatch = values.password === values.confirmPassword;
  const dob = new Date(values.dateOfBirth);
  const age = new Date().getFullYear() - dob.getFullYear();
  const isOldEnough = age >= 18;
  const termsAccepted = form.terms.checked;
  const allFilled = Object.values(values).every(Boolean);

  // Error messages
  emailError.textContent = !values.email || isValidEmail ? "" : "Invalid email format";
  passwordError.textContent = !values.password || isValidPassword
    ? ""
    : "Password must be at least 8 characters and include a number and a symbol";
  confirmError.textContent = !values.confirmPassword || passwordsMatch
    ? ""
    : "Passwords do not match";

  // Enable submit if everything is valid
  submitButton.disabled = !(
    allFilled &&
    isValidEmail &&
    isValidPassword &&
    passwordsMatch &&
    isOldEnough &&
    termsAccepted
  );
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());

  form.style.display = "none";
  summaryCard.style.display = "block";
  summaryCard.innerHTML = `
    <h3>Registration Summary</h3>
    <p><strong>Full Name:</strong> ${values.fullName}</p>
    <p><strong>Email:</strong> ${values.email}</p>
    <p><strong>Password:</strong> ••••••••</p>
    <p><strong>Date of Birth:</strong> ${values.dateOfBirth}</p>
    <p><strong>Phone:</strong> ${values.telephoneNumber}</p>
    <p><strong>Country:</strong> ${values.country}</p>
  `;
});
