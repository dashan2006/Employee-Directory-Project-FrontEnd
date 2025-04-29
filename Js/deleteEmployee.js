function deleteEmployee() {
    const id = document.getElementById("deleteInput").value.trim();
    const resultDiv = document.getElementById("deleteResult");
  
    if (!id) {
      alert("Please enter a valid Employee ID.");
      return;
    }
  
    fetch(`http://localhost:8080/employee/delete/${id}`, {
      method: "DELETE",
    })
      .then(response => {
        if (!response.ok) throw new Error("Employee not found or already deleted.");
        return response.text();
      })
      .then(result => {
        resultDiv.innerHTML = `<p class="text-success">${result}</p>`;
      })
      .catch(error => {
        resultDiv.innerHTML = `<p class="text-danger">${error.message}</p>`;
      });
  }
  