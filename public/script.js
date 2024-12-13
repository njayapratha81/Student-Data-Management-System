document.addEventListener('DOMContentLoaded', function () {
    fetch('/students')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#student-table tbody');
            tableBody.innerHTML = '';
            data.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.id}</td>
                    <td>${student.total}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching students:', error));
});
