const timesheetEntries = JSON.parse(localStorage.getItem('timesheetEntries')) || [];

document.getElementById('timesheet-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const hours = parseFloat(document.getElementById('hours').value);
    const task = document.getElementById('task').value;
    const extraHours = hours > 8 ? hours - 8 : 0;
    const status = "Pending";

    const newEntry = { date, hours, task, extraHours, status };

    timesheetEntries.push(newEntry);
    localStorage.setItem('timesheetEntries', JSON.stringify(timesheetEntries));
    renderEntries();
    clearForm();
});

function renderEntries() {
    const tableBody = document.getElementById('timesheet-entries');
    tableBody.innerHTML = '';
    timesheetEntries.forEach(entry => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.hours}</td>
            <td>${entry.task}</td>
            <td>${entry.extraHours > 0 ? entry.extraHours : 'No extras'}</td>
            <td>${entry.status}</td>
        `;
        tableBody.appendChild(newRow);
    });
}

function clearForm() {
    document.getElementById('date').value = '';
    document.getElementById('hours').value = '';
    document.getElementById('task').value = '';
}


document.getElementById('validate-hours').addEventListener('click', function () {
    timesheetEntries.forEach(entry => {
        entry.status = entry.hours <= 8 ? 'Approved' : 'Rejected';
    });
    localStorage.setItem('timesheetEntries', JSON.stringify(timesheetEntries));
    renderEntries();
});


document.getElementById('consult-hours').addEventListener('click', function () {
    const totalHours = timesheetEntries.reduce((total, entry) => total + entry.hours, 0);
    document.getElementById('total-hours').innerText = `Total hours worked: ${totalHours}`;
});

renderEntries();
