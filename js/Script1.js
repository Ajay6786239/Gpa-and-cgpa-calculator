document.getElementById('fetchSubjects').addEventListener('click', fetchSubjects);
document.getElementById('calculateGPA').addEventListener('click', calculateGPA);

function fetchSubjects() {
    const department = document.getElementById('department').value;
    const semester = document.getElementById('semester').value;

    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            const subjectsContainer = document.getElementById('subjectsContainer');
            subjectsContainer.innerHTML = '';

            if (data[department] && data[department][semester]) {
                data[department][semester].forEach(subject => {
                    const subjectDiv = document.createElement('div');
                    const credit = subject.credit || 0; // Default to 0 if credit is not defined
                    subjectDiv.innerHTML = `
                        <p>${subject.subject} (${subject.code}) - Credits: ${credit}</p>
                        <label for="${subject.code}-grade">Grade:</label>
                        <select id="${subject.code}-grade" data-credit="${credit}">
                            <option value="10">O</option>
                            <option value="9">A+</option>
                            <option value="8">A</option>
                            <option value="7">B+</option>
                            <option value="6">B</option>
                            <option value="5">C</option>
                            <option value="0">F</option>
                        </select>
                    `;
                    subjectsContainer.appendChild(subjectDiv);
                });
            } else {
                subjectsContainer.innerHTML = 'No subjects found for the selected department and semester.';
            }
        });
}

function calculateGPA() {
    const grades = Array.from(document.querySelectorAll('select[id$="-grade"]')).map(select => parseFloat(select.value));
    const credits = Array.from(document.querySelectorAll('select[id$="-grade"]')).map(select => parseInt(select.getAttribute('data-credit')));

    // Check for invalid grades
    if (grades.some(grade => grade > 10)) {
        alert('GPA should be less than or equal to 10');
        return;
    }

    // Calculate total points and total credits
    let totalPoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < grades.length; i++) {
        totalPoints += grades[i] * credits[i]; // Multiply grade by credit for each subject
        totalCredits += credits[i]; // Sum up all credits
    }

    // Calculate GPA based on total points and total credits
    const gpa = totalCredits ? (totalPoints / totalCredits) : 0;

    document.getElementById('result').innerHTML = `Your GPA is: ${gpa.toFixed(2)}`;
}
