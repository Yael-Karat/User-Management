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

    const handleNext = () => {
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();
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
            gender !== '1' ? '' : 'Please select a gender',
        ];

        if (errors.every((error) => error === '')) {
            const user = {
                firstName,
                lastName,
                email,
                password,  // Include the password in the user object
                dob,
                gender,
                comments,
            };
            userData.push(user);
            userData.sort((a, b) => a.lastName.localeCompare(b.lastName));

            renderUserList();

            // Reset input fields to blank
            document.getElementById('first-name').value = '';
            document.getElementById('last-name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            document.getElementById('confirm-password').value = '';
            document.getElementById('dob').value = '';
            document.getElementById('Gender').value = '1';
            document.getElementById('comments').value = '';

            currentStep = 1;
            renderForm();
        }
    };

    const goBack = () => {
        currentStep = 1;
        renderForm();
    };

    const addEventListeners = () => {
        const nextButton = document.getElementById('next-button');
        if (nextButton) {
            nextButton.addEventListener('click', handleNext);
        }

        const saveButton = document.getElementById('save-button');
        if (saveButton) {
            saveButton.addEventListener('click', handleSave);
        }

        const backButton = document.getElementById('back-button');
        if (backButton) {
            backButton.addEventListener('click', goBack);
        }
    };

    return {
        renderForm,
        renderUserList,
    };
})();

RegistrationModule.renderForm();