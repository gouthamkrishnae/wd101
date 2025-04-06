<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Form</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #f8f9fa;
        }
        .container {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 300px;
            margin-top: 50px;
        }
        input, button {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        button {
            background-color: green;
            color: white;
            cursor: pointer;
        }
        .entries {
            margin-top: 20px;
            width: 80%;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        th, td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: center;
        }
        .checkbox-container {
            display: flex;
            align-items: center;
            gap: 5px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <form id="registrationForm">
            <h2>Registration Form</h2>
            <label for="name">Name</label>
            <input type="text" id="name" placeholder="Enter full name" required>

            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Enter email" required>

            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Enter password" required>

            <label for="dob">Date of Birth</label>
            <input type="date" id="dob" required>

            <div class="checkbox-container">
                <input type="checkbox" id="terms">
                <label for="terms">Accept Terms & Conditions</label>
            </div>

            <button type="submit">Submit</button>
        </form>
    </div>

    <div class="entries">
        <h3>Entries</h3>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>DOB</th>
                    <th>Accepted terms?</th>
                </tr>
            </thead>
            <tbody id="entriesTable"></tbody>
        </table>
    </div>

    <script>
        const form = document.getElementById('registrationForm');
        const table = document.getElementById('entriesTable');

        function getEntries() {
            const entries = localStorage.getItem('user-entries');
            return entries ? JSON.parse(entries) : [];
        }

        function displayEntries() {
            const entries = getEntries();
            table.innerHTML = '';
            entries.forEach(entry => {
                const newRow = table.insertRow();
                newRow.innerHTML = `
                    <td>${entry.name}</td>
                    <td>${entry.email}</td>
                    <td>${entry.password}</td>
                    <td>${entry.dob}</td>
                    <td>${entry.termsAccepted}</td>
                `;
            });
        }

        function calculateAge(dob) {
            const birthDate = new Date(dob);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }

        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const dob = document.getElementById('dob').value;
            const termsAccepted = document.getElementById('terms').checked;

            const age = calculateAge(dob);
            if (age < 18 || age > 55) {
                alert('Age must be between 18 and 55.');
                return;
            }

            const newEntry = {
                name,
                email,
                password,
                dob,
                termsAccepted
            };

            const entries = getEntries();
            entries.push(newEntry);
            localStorage.setItem('user-entries', JSON.stringify(entries));

            displayEntries();
            form.reset();
        });

        // Load existing entries on every page load
        displayEntries();
    </script>
</body>
</html>
