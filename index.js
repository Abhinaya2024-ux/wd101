document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    const dobInput = document.getElementById('dob');
    const dobError = document.getElementById('dobError');

    // Load saved data from localStorage
    const savedData = JSON.parse(localStorage.getItem('formData')) || [];
    savedData.forEach(data => addRowToTable(data));

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate age (18-55 years)
        const dob = new Date(dobInput.value);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        if (age < 18 || age > 55) {
            dobError.textContent = 'You must be between 18 and 55 years old to register.';
            return;
        } else {
            dobError.textContent = '';
        }

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            dob: dobInput.value,
            acceptTerms: document.getElementById('acceptTerms').checked
        };

        // Save to localStorage
        savedData.push(formData);
        localStorage.setItem('formData', JSON.stringify(savedData));

        // Add to table
        addRowToTable(formData);

        // Reset form
        form.reset();
    });

    function addRowToTable(data) {
        const row = userTable.insertRow();
        row.insertCell(0).textContent = data.name;
        row.insertCell(1).textContent = data.email;
        row.insertCell(2).textContent = data.password;
        row.insertCell(3).textContent = data.dob;
        row.insertCell(4).textContent = data.acceptTerms ? 'true' : 'false';
    }
});