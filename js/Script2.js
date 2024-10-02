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



document.getElementById('download-btn').addEventListener('click', downloadPDF);

function downloadPDF() {
    const semester = parseInt(document.getElementById('cgpaSemester').value);
    const doc = new jspdf.jsPDF();

    doc.setFontSize(18);
    doc.text('CGPA Details', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    let yPosition = 40;

    for (let i = 1; i <= semester; i++) {
        const gpa = parseFloat(document.getElementById(`gpa-sem${i}`).value);
        if (!isNaN(gpa)) {
            doc.text(`Semester ${i}: GPA = ${gpa.toFixed(2)}`, 20, yPosition);
            yPosition += 10;
        }
    }

    const totalPoints = [...Array(semester).keys()].map(i => parseFloat(document.getElementById(`gpa-sem${i + 1}`).value)).reduce((a, b) => a + b, 0);
    const cgpa = (totalPoints / semester).toFixed(2);

    yPosition += 10;
    doc.setFontSize(14);
    doc.text(`Calculated CGPA: ${cgpa}`, 20, yPosition);

    // Add designed by text at the bottom
    doc.setFontSize(10);
    doc.text('Designed by Ajay P', 105, 280, { align: 'center' });

    // Save the generated PDF
    doc.save('CGPA_Details.pdf');
}
