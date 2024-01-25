const RegistrationModule = (() => {
    let userData = [];
    let currentStep = 1;

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9-]+\.)+ac\.il$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    };

    const isValidDateOfBirth = (dob) => {
        const currentDate = new Date();
        const userDate = new Date(dob);
        const ageDiff = currentDate.getFullYear() - userDate.getFullYear();
        return ageDiff >= 18;
    };

    const validInput = (input, type) => {
        const trimmedInput = input.trim();
        switch (type) {
            case 'name':
                return trimmedInput.match(/^[a-zA-Z]+$/) ? '' : 'Name is mandatory and must contain only alphabets.';
            case 'email':
                return isValidEmail(trimmedInput) ? '' : 'Email is mandatory and must be valid for an academic email from Israel (*.ac.il).';
        }
    };

    const validateInput = (input, type) => {
        const trimmedInput = input.trim();
        switch (type) {
            case 'name':
                return trimmedInput.match(/^[a-zA-Z]+$/) ? '' : 'Name is mandatory and must contain only alphabets.';
            case 'email':
                return isValidEmail(trimmedInput) ? '' : 'Email is mandatory and must be valid for an academic email from Israel (*.ac.il).';
            case 'password':
                return isValidPassword(trimmedInput) ? '' : 'Password must contain at least one uppercase letter, at least one lowercase letter, one digit, and must be at least 8 characters long.';
            case 'dob':
                return isValidDateOfBirth(trimmedInput) ? '' : 'User must be at least 18 years old.';
            default:
                return '';
        }
    };

    function validFirstStep() {
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();

        const firstNameError = validInput(firstName, 'name');
        const lastNameError = validInput(lastName, 'name');
        const emailError = validInput(email, 'email');

        if (!firstNameError && !lastNameError && !emailError) {
            // No errors, directly advance to the next step
            handleNext();
        } else {
            // Display error messages
            document.getElementById('firstNameError').innerText = firstNameError;
            document.getElementById('lastNameError').innerText = lastNameError;
            document.getElementById('emailError').innerText = emailError;
        }
    }

    const handleNext = () => {
        // Hide the first form and show the second form
        document.getElementById('firstStep').style.display = 'none';
        document.getElementById('secondStep').style.display = 'block';
        currentStep = 2; // Update the current step
    };

    const handleSave = () => {
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();
        const dob = document.getElementById('dob').value.trim();
        const gender = document.getElementById('Gender').value;
        const comments = document.getElementById('comments').value.trim();

        const errors = [
            validateInput(firstName, 'name'),
            validateInput(lastName, 'name'),
            validateInput(email, 'email'),
            validateInput(password, 'password'),
            password === confirmPassword ? '' : 'Passwords do not match',
            validateInput(dob, 'dob'),
            gender !== '1' ? '' : 'Please select a gender.',
        ];

        if (errors.every((error) => error === '')) {
            const user = {
                firstName,
                lastName,
                email,
                password,
                dob,
                gender,
                comments,
            };

            // Insert user in alphabetical order based on last name
            const index = userData.findIndex((u) => u.lastName > lastName);
            if (index === -1) {
                userData.push(user);
            } else {
                userData.splice(index, 0, user);
            }

            renderUserList();
            // Optionally, add a success message or visual indication

            // Reset input fields to blank
            document.getElementById('first-name').value = '';
            document.getElementById('last-name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            document.getElementById('confirm-password').value = '';
            document.getElementById('dob').value = '';
            document.getElementById('Gender').value = '1';
            document.getElementById('comments').value = '';

            // Show the first form and hide the second form
            document.getElementById('secondStep').style.display = 'none';
            document.getElementById('firstStep').style.display = 'block';
        } else {
            // Display error messages for incorrect inputs
            document.getElementById('passwordError').innerText = errors[3];
            document.getElementById('confirmPasswordError').innerText = errors[4];
            document.getElementById('dateOfBirthError').innerText = errors[5];
            document.getElementById('genderError').innerText = errors[6];
        }
    };

    const goBack = () => {
        if (currentStep === 2) {
            // If currently on the second step, go back to the first step
            document.getElementById('secondStep').style.display = 'none';
            document.getElementById('firstStep').style.display = 'block';
            currentStep = 1;
        }
    };

    const renderUserList = () => {
        const userList = document.getElementById('userList');
        userList.innerHTML = ''; // Clear previous list

        userData.forEach((user) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.dob}</td>
                <td>${user.password}</td>
                <td>${user.gender}</td>
                <td>${user.comments}</td>
            `;
            userList.appendChild(row);
        });

        // Show the table if there are users, otherwise hide it
        document.querySelector('.table').style.display = userData.length ? 'table' : 'none';
    };

    const addEventListeners = () => {
        const nextButton = document.getElementById('next-button');
        if (nextButton) {
            nextButton.addEventListener('click', handleNext);
        }

        const backButton = document.getElementById('previous-button');
        if (backButton) {
            backButton.addEventListener('click', goBack);
        }

        const saveButton = document.getElementById('save-button');
        if (saveButton) {
            saveButton.addEventListener('click', handleSave);
        }
    };
    addEventListeners();

    return {
        validFirstStep,
        renderUserList,
    };
})();