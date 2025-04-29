function addEmployee(){
    let Id = document.getElementById("txtId").value;
    let Name = document.getElementById("txtName").value;
    let Gender = document.getElementById("txtGender").value;
    let Salary = document.getElementById("txtSalary").value;
    
    console.log(Id);
    console.log(Name);
    console.log(Gender);
    console.log(Salary);

    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
     
      "gender": Gender,
      "salary": Salary,
      "name": Name
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
     
    };
    
    fetch("http://localhost:8080/employee/add", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    
    
    }