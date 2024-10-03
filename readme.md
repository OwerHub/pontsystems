Test Task

# Test Assignment

The details of the task are outlined below:

# Setup

In the frontend folder:

```sh
npm i
npm run dev
```

In the backend folder:

```sh
npm i
node server.js
```

# Notes

- The backend was created purely for testing purposes (authentication wouldn't work without it), so it's a dummy implementation. I focused more on the task itself.
- For the same reason, the styling and formatting are very basic (it wasn't part of the task). Some CSS was added, but I plan to revisit it. If I can fit it into the 50MB container, I would use Tailwind.
- At the bottom of the application, there are buttons for testing—validating whether the token is being sent with requests and if responses are being received, etc.
- For this task, I emulated API calls using Redux in various ways (if I understood correctly, this was part of the task). Partially to demonstrate handling asynchronous operations and partially to showcase different approaches to using redux-toolkit.
- The solution doesn't always follow best practices for production environments, as the focus was on meeting the task's challenges.
- I prepared the Dockerfiles, but since Docker needs to be reinstalled on this machine, I haven't had the chance to test it yet. If my memory serves me right, it should work. I'll also write a docker-compose file for it.
- The additional task of setting up linter/prettier and GitHub Actions wasn't part of my daily work, but after some learning, I intend to do this as well.

x# 3rd-Party Dependencies

Please use the following 3rd-party dependencies:

- Axios
- React Hook Form
- React-Router v6+
- Redux Toolkit
- Ant Design

# Test requirements

- Implement authentication (JWT).
- If any request returns a 401 error, the application should log the user out.
- Implement internal page navigation using React-Router v6+.
- Create an ErrorBoundary.
- After successful authentication, the system should navigate to the dashboard, where a table should list the recorded transactions so far.
- Store the table data in Redux for the purpose of this task.
- Implement the API calls for the table using Redux `createAsyncThunk`.
- Above the table, there should be a "New Registration" button that navigates to the registration page.
- In the last column of the table, there should be view, edit, and delete buttons (use SVG icons).
- Clicking delete should open a dirty-check modal asking, "Are you sure you want to delete the registration?"
- For view/edit, load the registration form. When in view mode, all fields should be readonly or disabled.

## Fields

- **Title** (select - required)
- **Last Name** (text - required)
- **First Name** (text - required)
- **Middle Name** (text - required)
- **Gender** (select - required)
- **Maiden Name** (text - only shown if the gender is female - required if female)
- **Place of Birth** (text - required)
- **Date of Birth** (datepicker - cannot be before 1900 - required)
- **Nationality** (text - required)
- **Tax Identifier** (number - exactly 11 characters, must start with 8 and include one 2)
- **Credit Eligible?** (select - fixed to disabled. If Nationality is Hungarian (case-insensitive) and there is a valid tax identifier, the field will show "yes", otherwise it will show "no").

Mark required fields with a red asterisk (\*) in the label (the system should automatically add the asterisk if the validation is required).

If a field is invalid, display the error message below the field in red and change the input border to red.

## At the Bottom of the Page

- There should be Save and Close buttons.
- On clicking Save, trigger an API call and provide feedback on success/failure. If successful, navigate back to the dashboard.
- On clicking Close, if there are unsaved changes, a dirty-check modal should pop up: "There are unsaved changes. Are you sure you want to close?" Yes/No. Clicking "No" does nothing. Clicking "Yes" navigates back to the dashboard.

## Optional

- Control the modal via Redux.
- Dockerize the frontend application. It should run under Nginx, and the image should not exceed 50MB.
