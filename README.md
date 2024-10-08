## Author
**Yael Karat** - [@Yael-Karat](https://github.com/Yael-Karat)

### An introductory exercise in a web programming course in undergraduate studies in computer science at Hadassah College.

## The purpose of the exercise
building a user information registration page and displaying a list of users.

## More information about the exercise
This list will be saved in my JS program (this is not persistent data, when reloading the page, data will be lost).  
The page presents various input fields to record the user, and upon completion, the user will be added to the list.  
The list will be displayed below the form inputs.  
At the beginning, the list is empty.

The input form will be presented in 2 steps:
1. First, the user will be presented with input for first name, last name, and email.  
2. Then upon clicking on a “next” button:  
   a. The remaining input elements will be shown - password, confirm password, date, gender, comments.  
   b. First name, last name, and email will not be shown.  
   c. A “previous” button should allow returning to step 1.

The UI will appear to the user as 2 consecutive pages (while it really happens on the same page).  
The next button should first validate the input fields.  
If the input fields contain errors, it will display relevant error messages and not proceed to step 2.  
If the input is valid, it will go to step 2, displaying the remaining input fields and a “save” button to record new user information.  
The “save” button will perform validation on the remaining input, and if validated, it will add the user information to the list of users and reset all the input elements.  
Upon completion, the updated list of users should be displayed with the first part of the input (step 1).

## Assumptions
The site use bootstrap CDN therefore assumes an internet connection is available.
