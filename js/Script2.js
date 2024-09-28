document.getElementById('cgpaSemester').addEventListener('change', updateGPAInputs);
document.getElementById('calculateCGPA').addEventListener('click', calculateCGPA);

function updateGPAInputs() {
    const semester = parseInt(document.getElementById('cgpaSemester').value);
    const gpaInputsContainer = document.getElementById('gpaInputsContainer');
    gpaInputsContainer.innerHTML = '';

    for (let i = 1; i <= semester; i++) {
        const inputDiv = document.createElement('div');
        inputDiv.innerHTML = `
            <label for="gpa-sem${i}">Enter GPA for Semester ${i}:</label>
            <input type="number" id="gpa-sem${i}" min="0" max="10" step="0.01" required>
        `;
        gpaInputsContainer.appendChild(inputDiv);
    }
}

function calculateCGPA() {
    const semester = parseInt(document.getElementById('cgpaSemester').value);
    const gpaValues = [];

    for (let i = 1; i <= semester; i++) {
        const gpa = parseFloat(document.getElementById(`gpa-sem${i}`).value);
        if (gpa > 10) {
            alert('GPA should be less than or equal to 10');
            return;
        }
        gpaValues.push(gpa);
    }

    const totalPoints = gpaValues.reduce((sum, gpa) => sum + gpa, 0);
    const cgpa = totalPoints / semester;

    document.getElementById('cgpaResult').innerHTML = `Your CGPA is: ${cgpa.toFixed(2)}`;
}
