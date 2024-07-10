document.getElementById('gpaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateGPA();
});

function addSubject() {
    const subjectContainer = document.getElementById('subjectContainer');
    const subjectCount = document.querySelectorAll('.subject').length + 1;

    const newSubject = document.createElement('div');
    newSubject.classList.add('subject');

    const gradeLabel = document.createElement('label');
    gradeLabel.setAttribute('for', 'grade' + subjectCount);
    gradeLabel.textContent = 'Grade';
    newSubject.appendChild(gradeLabel);

    const gradeSelect = document.createElement('select');
    gradeSelect.id = 'grade' + subjectCount;
    gradeSelect.name = 'grade[]';
    gradeSelect.required = true;
    gradeSelect.innerHTML = `
        <option value="">Select</option>
        <option value="4">A</option>
        <option value="3.67">A-</option>
        <option value="3.33">B+</option>
        <option value="3">B</option>
        <option value="2.67">B-</option>
        <option value="2.33">C+</option>
        <option value="2">C</option>
        <option value="1.67">C-</option>
        <option value="1.33">D+</option>
        <option value="1">D</option>
        <option value="0">F</option>`;
    newSubject.appendChild(gradeSelect);

    const creditHoursLabel = document.createElement('label');
    creditHoursLabel.setAttribute('for', 'creditHours' + subjectCount);
    creditHoursLabel.textContent = 'Credit Hours';
    newSubject.appendChild(creditHoursLabel);

    const creditHoursSelect = document.createElement('select');
    creditHoursSelect.id = 'creditHours' + subjectCount;
    creditHoursSelect.name = 'creditHours[]';
    creditHoursSelect.required = true;
    creditHoursSelect.innerHTML = `
        <option value="">Select</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>`;
    newSubject.appendChild(creditHoursSelect);

    subjectContainer.appendChild(newSubject);
}

function calculateGPA() {
    const prevCreditHours = parseFloat(document.getElementById('prevCreditHours').value);
    const prevCGPA = parseFloat(document.getElementById('prevCGPA').value);

    const grades = document.getElementsByName('grade[]');
    const creditHours = document.getElementsByName('creditHours[]');

    let totalPoints = 0;
    let totalCreditHours = 0;

    for (let i = 0; i < grades.length; i++) {
        const grade = parseFloat(grades[i].value);
        const credits = parseFloat(creditHours[i].value);

        totalPoints += grade * credits;
        totalCreditHours += credits;
    }

    const sgpa = totalPoints / totalCreditHours;
    const cumulativeCreditHours = prevCreditHours + totalCreditHours;
    const cumulativeGPA = (prevCGPA * prevCreditHours + sgpa * totalCreditHours) / cumulativeCreditHours;

    const sgpaFixed = sgpa.toFixed(2);
    const cumulativeGPAFixed = Math.min(cumulativeGPA, 4).toFixed(2);

    document.getElementById('result').innerHTML = `SGPA: ${sgpaFixed} &nbsp;&nbsp; CGPA: ${cumulativeGPAFixed}`;
}
