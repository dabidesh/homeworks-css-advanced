window.addEventListener('DOMContentLoaded', (event) => {
    const inputData = document.getElementById('inputData');
    const outHtmlTable = document.getElementById('outHtmlTable');
    const getTableButton = document.getElementById('getTable');

    getTableButton.addEventListener('click', function() {
        // Add the HTML table to the outHtmlTable paragraph
        outHtmlTable.innerHTML = inputData.value;

        // Parse the HTML string
        const parser = new DOMParser();
        const doc = parser.parseFromString(inputData.value, 'text/html');
        const table = doc.querySelector('table');

        // Extract the table to an array of objects
        const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent);
        const rows = Array.from(table.querySelectorAll('tr')).slice(1); // Exclude the header row
        const arrayTable = rows.map(row => {
            const cells = Array.from(row.querySelectorAll('td'));
            let obj = {};
            cells.forEach((cell, i) => {
                obj[headers[i]] = cell.textContent;
            });
            return obj;
        });

        // Output the array of objects
        const outJson = document.getElementById('outJson');
        outJson.value = JSON.stringify(arrayTable, null, 2);
        autoResize.call(outJson);
    });
});
