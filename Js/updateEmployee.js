function updateEmployee() {
    const id = document.getElementById("updateId").value.trim();
    const name = document.getElementById("updateName").value.trim();
    const gender = document.getElementById("updateGender").value.trim();
    const salary = document.getElementById("updateSalary").value.trim();
    const resultDiv = document.getElementById("updateResult");
  
    // Basic input validation
    if (!id || !name || !gender || !salary) {
      alert("Please fill out all fields.");
      return;
    }
  
    const EmployeeData = {
      id,
      name,
      gender,
      salary: parseFloat(salary)
    };
  
    try {
      fetch(`http://localhost:8080/employee/update-customer/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(employeeData),
        mode: "cors" // Ensures CORS handling (for cross-origin)
      })
      .then(response => {
        if (!response.ok) {
          // Handle specific HTTP errors
          if (response.status === 404) {
            throw new Error("Employee not found.");
          } else if (response.status === 400) {
            throw new Error("Bad request. Please check the data.");
          } else {
            throw new Error("Update failed due to server error.");
          }
        }
        return response.text();
      })
      .then(result => {
        resultDiv.innerHTML = `<p class="text-success">${result}</p>`;
      })
      .catch(error => {
        console.error("Fetch Error:", error);
        resultDiv.innerHTML = `<p class="text-danger">${error.message}</p>`;
      });
    } catch (e) {
      console.error("Unexpected Error:", e);
      resultDiv.innerHTML = `<p class="text-danger">Unexpected error occurred.</p>`;
    }
  }
  