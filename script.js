const RegistrationModule = (() => {
    let userData = [];
    let currentStep = 1;

    /**
     * isValidFirstName(firstName: string): boolean
     * Checks if the provided first name contains only alphabetic characters.
     * @param firstName {string}
     * @returns {boolean} indicating whether the first name is valid.
     */
    const isValidFirstName = (firstName) => {
        const FirstNameRegex = /^[a-zA-Z]+$/;
        return FirstNameRegex.test(firstName);
    };

    /**
     * isValidLastName(lastName: string): boolean
     * Checks if the provided last name contains only alphabetic characters.
     * @param lastName {string}
     * @returns {boolean} indicating whether the last name is valid.
     */
    const isValidLastName = (lastName) => {
        const LastNameRegex = /^[a-zA-Z]+$/;
        return LastNameRegex.test(lastName);
    };

    /**
     * isValidEmail(email: string): boolean
     * Checks if the provided email follows the pattern of an academic email from Israel (*.ac.il).
     * @param email {string}
     * @returns {boolean} indicating whether the email is valid.
     */
    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9-]+\.)+ac\.il$/;
        return emailRegex.test(email);
    };

    /**
     * isValidPassword(password: string): boolean
     * Checks if the provided password meets specific criteria: at least one uppercase letter, one lowercase letter, one digit, and a minimum length of 8 characters.
     * @param password {string}
     * @returns {boolean} indicating whether the password is valid.
     */
    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    };

    /**
     * isValidDateOfBirth(dob: string): boolean
     * Validates if the user is at least 18 years old based on the provided date of birth.
     * @param dob {string} representing the user's date of birth in the format 'YYYY-MM-DD'.
     * @returns {boolean} indicating whether the date of birth is valid.
     */
    const isValidDateOfBirth = (dob) => {
        const currentDate = new Date();
        const userDate = new Date(dob);
        const ageDiff = currentDate.getFullYear() - userDate.getFullYear();
        return ageDiff >= 18;
    };

    /**
     * validateInput(input: string, type: string): string
     * Validates various types of user input based on the specified type.
     * @param input {string} the user input to be validated.
     * @param type {string} the type of input to be validated ('firstName', 'lastName', 'email', 'password', 'dob').
     * @returns {string|string} an error message if the input is invalid according to the specified type, otherwise an empty string.
     */
    const validateInput = (input, type) => {
        const trimmedInput = input.trim();
        switch (type) {
            case 'firstName':
                return isValidFirstName(trimmedInput) ? '' : 'First name is mandatory and must contain only alphabets.';
            case 'lastName':
                return isValidLastName(trimmedInput) ? '' : 'Last name is mandatory and must contain only alphabets.';
            case 'email':
                return isValidEmail(trimmedInput) ? '' : 'Email is mandatory and must be valid for an academic email from Israel (*.ac.il).';
            case 'password':
                return isValidPassword(trimmedInput) ? '' : 'Password must contain at least one uppercase letter, at least one lowercase letter, one digit, and must be at least 8 characters long.';
            case 'dob':
                return isValidDateOfBirth(trimmedInput) ? '' : 'Date Of Birth is mandatory and user must be at least 18 years old.';
            default:
                return '';
        }
    };

    /**
     * Handles the validation and processing of user input for the first step of registration.
     * Validates first name, last name, and email input fields.
     * Displays error messages if input is invalid or if the email already exists.
     * Proceeds to the second step if no errors are found.
     */
    const validFirstStep = () => {
        // Reset error messages
        document.getElementById('firstNameError').innerText = '';
        document.getElementById('lastNameError').innerText = '';
        document.getElementById('emailError').innerText = '';

        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();

        const firstNameError = validateInput(firstName, 'firstName');
        const lastNameError = validateInput(lastName, 'lastName');
        const emailError = validateInput(email, 'email');

        // Check if the email already exists
        const emailExists = userData.some(user => user.email === email);
        if (emailExists) {
            document.getElementById('emailError').innerText = 'Email already exists. Please use a different email.';
            return;
        }

        // Display error messages for first name, last name and email
        document.getElementById('firstNameError').innerText = firstNameError;
        document.getElementById('lastNameError').innerText = lastNameError;
        document.getElementById('emailError').innerText = emailError;

        if (!firstNameError && !lastNameError && !emailError) {
            // No errors, proceed to the second step
            handleNext();
        } else {
            // Hide the second form if there are errors
            document.getElementById('secondStep').style.display = 'none';
        }
    };

    /**
     * Handles the transition from the first step of registration to the second step.
     * Hides the first step form and displays the second step form.
     */
    const handleNext = () => {
        // Hide the first form and show the second form
        document.getElementById('firstStep').style.display = 'none';
        document.getElementById('secondStep').style.display = 'block';
        currentStep = 2;
    };

    /**
     * Handles the validation and processing of user input for the second step of registration.
     * Validates all input fields (first name, last name, email, password, confirm password, date of birth, gender).
     * Displays error messages if input is invalid.
     * Saves user data if all input is valid, updates the user list, and resets input fields.
     */
    const handleSave = () => {
        // Reset error messages
        document.getElementById('passwordError').innerText = '';
        document.getElementById('confirmPasswordError').innerText = '';
        document.getElementById('dateOfBirthError').innerText = '';
        document.getElementById('genderError').innerText = '';

        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();
        const dob = document.getElementById('dob').value.trim();
        const gender = document.getElementById('gender').value; // Corrected reference to "gender"
        const comments = document.getElementById('comments').value.trim();

        const errors = [
            validateInput(firstName, 'firstName'),
            validateInput(lastName, 'lastName'),
            validateInput(email, 'email'),
            validateInput(password, 'password'),
            password === confirmPassword ? '' : 'Passwords do not match',
            validateInput(dob, 'dob'),
            gender !== 'Please select' ? '' : 'Please select a gender.', // Corrected line
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

            // Reset input fields to blank
            document.getElementById('first-name').value = '';
            document.getElementById('last-name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            document.getElementById('confirm-password').value = '';
            document.getElementById('dob').value = '';
            document.getElementById('gender').value = 'Please select';
            document.getElementById('comments').value = '';

            // Reset form fields to their default values
            document.getElementById('firstForm').reset();

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

    /**
     * Handles navigation back to the first step of registration from the second step.
     * Hides the second step form and displays the first step form.
     */
    const handlePrevious = () => {
        if (currentStep === 2) {
            // If currently on the second step, go back to the first step
            document.getElementById('secondStep').style.display = 'none';
            document.getElementById('firstStep').style.display = 'block';
            currentStep = 1;
        }
    };

    /**
     * Renders the list of registered users in a table format on the webpage.
     * Populates the table with user data including first name, last name, email, date of birth, password, gender, and comments.
     * Updates the visibility of the table and an empty table message based on the presence of user data.
     */
    const renderUserList = () => {
        const userList = document.getElementById('userList');
        userList.innerHTML = '';

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

        // Show or hide the message for an empty table based on the number of users
        document.getElementById('emptyTableMessage').style.display = userData.length ? 'none' : 'block';
    };

    const addEventListeners = () => {
        const nextButton = document.getElementById('next-button');
        if (nextButton) {
            nextButton.addEventListener('click', validFirstStep);
        }

        const backButton = document.getElementById('previous-button');
        if (backButton) {
            backButton.addEventListener('click', handlePrevious);
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
        handlePrevious
    };
})();