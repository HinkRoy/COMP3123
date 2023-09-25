var http = require("http");
// Import the Employee Module
const { employees } = require('./Employee'); // Adjust the path as needed

console.log("Lab 03 - NodeJs");

// Define Server Port
const port = process.env.PORT || 8081;

// Create Web Server using CORE API
const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`);
    } else {
        if (req.url === '/') {
            // Display message "<h1>Welcome to Lab Exercise 03</h1>"
            res.setHeader('Content-Type', 'text/html');
            res.end('<h1>Welcome to Lab Exercise 03</h1>');
        }

        if (req.url === '/employee') {
            // Display all details for employees in JSON format
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(employees));
        }

        if (req.url === '/employee/names') {
            // Display only all employees {first name + lastname} in Ascending order in JSON Array
            const sortedNames = employees.map(employee => `${employee.firstName} ${employee.lastName}`).sort();
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(sortedNames));
        }

        if (req.url === '/employee/totalsalary') {
            // Calculate and display the Sum of all employees' salaries in the given JSON format
            const totalSalary = employees.reduce((total, employee) => total + employee.salary, 0);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ total_salary: totalSalary }));
        }
    }

    res.end(`{"error": "${http.STATUS_CODES[404]}"}`);
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
