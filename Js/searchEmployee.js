function searchEmployee() {
    const input = document.getElementById("searchInput").value.trim();
  
    if (!input) {
        alert("Please enter an ID or Name to search.");
        return;
    }
  
    let url;
    if (!isNaN(input)) {
        // If numeric, treat as ID
        url = `http://localhost:8080/employee/search-by-id/${input}`;
    } else {
        // If text, treat as Name
        url = `http://localhost:8080/employee/search-by-name/${input}`;
    }
  
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Employee not found");
            }
            return response.json();
        })
        .then((customer) => {
            const resultDiv = document.getElementById("results");
  
            if (!employee || (Array.isArray(employee) && employee.length === 0)) {
                resultDiv.innerHTML = "<p>No employee found.</p>";
                return;
            }
  
            if (Array.isArray(employee)) {
                // If backend returns array (e.g. for name search)
                resultDiv.innerHTML = employee.map(c => `
                    <p><strong>ID:</strong> ${c.id} | <strong>Name:</strong> ${c.name} | <strong>Gender:</strong> ${c.gender} | <strong>Salary:</strong> ${c.salary}</p>
                `).join("");
            } else {
                // If backend returns single object (e.g. for ID search)
                resultDiv.innerHTML = `
                    <p><strong>ID:</strong> ${employee.id}</p>
                    <p><strong>Name:</strong> ${employee.name}</p>
                    <p><strong>Gender:</strong> ${employee.gender}</p>
                    <p><strong>Salary:</strong> ${employee.salary}</p>
                `;
            }
        })
        .catch((error) => {
            console.error(error);
            document.getElementById("results").innerHTML = "<p>Customer not found or error fetching data.</p>";
        });
  }
  