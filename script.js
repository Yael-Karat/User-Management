const RegistrationModule = (() => {
    let userData = [];
    let currentStep = 1;

    const createErrorMessage = (message) => {
        const errorMessage = document.createElement('p');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        return errorMessage;
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
                return trimmedInput.match(/^[a-zA-Z]+$/) ? '' : 'Invalid name';
            case 'email':
                return isValidEmail(trimmedInput) ? '' : 'Invalid email';
            case 'password':
                return isValidPassword(trimmedInput) ? '' : 'Invalid password';
            case 'dob':
                return isValidDateOfBirth(trimmedInput) ? '' : 'User must be at least 18 years old';
            default:
                return '';
        }
    };

    const handleSubmit = () => {
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();
        const dob = document.getElementById('dob').value.trim();
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const notes = document.getElementById('notes').value.trim();

        const errors = [
            validateInput(firstName, 'name'),
            validateInput(lastName, 'name'),
            validateInput(email, 'email'),
            validateInput(password, 'password'),
            password === confirmPassword ? '' : 'Passwords do not match',
            validateInput(dob, 'dob')
        ];

        const errorContainer = document.getElementById('error-container');
        errorContainer.innerHTML = '';
        errors.forEach((error) => {
            if (error) {
                errorContainer.appendChild(createErrorMessage(`Input ${error}`));
            }
        });

        if (errors.every((error) => error === '')) {
            if (currentStep === 1) {
                currentStep = 2;
                renderForm();
            } else {
                const user = {
                    firstName,
                    lastName,
                    email,
                    password,
                    dob,
                    gender,
                    notes,
                };
                userData.push(user);
                userData.sort((a, b) => a.lastName.localeCompare(b.lastName));

                renderUserList();

                currentStep = 1;
                renderForm();
            }
        }
    };

    const goBack = () => {
        currentStep = 1;
        renderForm();
    };

    const renderForm = () => {
        const registrationContainer = document.getElementById('registration-container');
        registrationContainer.innerHTML = '';

        if (currentStep === 1) {
            const form1 = document.createElement('div');
            form1.innerHTML = `
            <label for="first-name">First Name:</label>
            <input type="text" id="first-name" required>
            <label for="last-name">Last Name:</label>
            <input type="text" id="last-name" required>
            <label for="email">Email:</label>
            <input type="email" id="email" required>
            <button onclick="RegistrationModule.handleSubmit()">Next</button>
            <div id="error-container"></div>
        `;
            registrationContainer.appendChild(form1);
        } else {
            const form2 = document.createElement('div');
            form2.innerHTML = `
            <label for="password">Password:</label>
            <input type="password" id="password" required>
            <label for="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" required>
            <label for="dob">Date of Birth:</label>
            <input type="date" id="dob" required>
            <label>Gender:</label>
            <label for="male">Male</label>
            <input type="radio" id="male" name="gender" value="male" required>
            <label for="female">Female</label>
            <input type="radio" id="female" name="gender" value="female" required>
            <label for="notes">Notes:</label>
            <textarea id="notes" maxlength="100"></textarea>
            <button onclick="RegistrationModule.handleSubmit()">Save</button>
            <button onclick="RegistrationModule.goBack()">Back</button>
            <div id="error-container"></div>
        `;
            registrationContainer.appendChild(form2);
        }
    };

    const renderUserList = () => {
        const registrationContainer = document.getElementById('registration-container');
        registrationContainer.innerHTML = '';

        if (userData.length > 0) {
            const userList = document.createElement('table');
            userList.innerHTML = `
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          ${userData.map(user => `
            <tr>
              <td>${user.lastName}</td>
              <td>${user.firstName}</td>
              <td>${user.email}</td>
              <td>${user.password}</td>
              <td>${user.dob}</td>
              <td>${user.gender}</td>
              <td>${user.notes}</td>
            </tr>
          `).join('')}
        </tbody>
      `;
            registrationContainer.appendChild(userList);
        }
    };

    return {
        handleSubmit,
        goBack,
        renderForm,
        renderUserList
    };
})();

RegistrationModule.renderForm();
