var employees = new EmployeeContainer();

if (employees.getAllEmployees().length == 0) {
    employees.addEmployee(new EmployeeModel("1", "Satya", "Manager", 315135));
    employees.addEmployee(new EmployeeModel("2", "John", "Recuriter", 13153132));
}

window.onload = function () {
    $("#frmAddNew").hide();
}


function EmployeeModel(employeeId, employeeName, job, salary) {

    this.employeeId = employeeId;
    this.employeeName = employeeName;
    this.job = job;
    this.salary = salary;

    var self = this;

    this.getInfo = function () {
        return "Id:" + self.employeeId + " Name:" + self.employeeName + " Job:" + self.job + " Salary: " + self.salary;
    }
    
    
}

function EmployeeContainer() {
    var data = [];
    this.addEmployee = function (employee) {
        data.push(employee);
    }
    this.getCount = function () {
        return data.length;
    }

    this.getEmployeeById = function (id) {
        for (var i = 0; i < data.length; ++i) {
            if (data[i].employeeId == id)
                return data[i];
        }
    }

    this.getEmployeeByName = function (Name) {
        for (var i = 0; i < data.length; ++i) {
            if (data[i].employeeName == Name)
                return data[i];
        }
    }

    this.deleteEmployeeById = function (id) {
        for (var i = 0; i < data.length; ++i) {
            if (data[i].employeeId == id)
                data.splice(i, 1);
        }
    }

    this.updateEmployee = function (employee) {
        for (var i = 0; i < data.length; ++i) {
            if (data[i].employeeId == employee.employeeId) {
                data[i].employeeName = employee.employeeName;
                data[i].job = employee.job;
                data[i].salary = employee.salary;
            }
        }
    }

    this.getAllEmployees = function () {
        return data;
    }
}




function Init(employeeslist) {
        var table = "<table><tr id='tableHeader'><th>Employee Id</th><th>Employee Name</th><th>Job</th><th>Salary</th><th>Action</th></tr>";
        employeeslist.getAllEmployees().forEach(function (entity) {
            table += "<tr><td>" + entity.employeeId + "</td><td>" + entity.employeeName + "</td><td>" + entity.job + "</td><td>" + entity.salary +
                "</td><td><a href='javascript:void(0);' onclick='onEdit(" + entity.employeeId + ")'>Edit</a> | <a href='javascript:void(0);' onclick='onDelete(" + entity.employeeId + ")'>Delete</a></td>";
        });
        table += "</table><br /><br /><button type='button' id='addNew' onclick='addNewEmployee()'>Add New Employee</button>";
        document.getElementById("table").innerHTML = table;
    }

function addNewEmployee() {
    $("#addNew").hide();
    $("#frmAddNew").show();
}

function btnCancel_onclick() {
    $("#addNew").show();
    $("#frmAddNew").hide();
}

function btnSummit_onclick() {
    if (employees.getEmployeeById($("#txtEmployeeId").val()) == undefined)
    {
        employees.addEmployee(new EmployeeModel($("#txtEmployeeId").val(), $("#txtEmployeeName").val(), $("#txtJob").val(), $("#txtSalary").val()));
    }
    else {
        employees.updateEmployee(new EmployeeModel($("#txtEmployeeId").val(), $("#txtEmployeeName").val(), $("#txtJob").val(), $("#txtSalary").val()));
    }
    Init(employees);
    $("#addNew").show();
    $("#frmAddNew").hide();
}

function onDelete(id) {
    for (var i = 0; i < employees.getAllEmployees().length; ++i) {
        if (id == employees.getAllEmployees()[i].employeeId)
            employees.deleteEmployeeById(id);
    }
    Init(employees);
}

function onEdit(id) {
    $("#addNew").hide();
    $("#frmAddNew").show();
    
    for (var i = 0; i < employees.getAllEmployees().length; ++i) {
        if (id == employees.getAllEmployees()[i].employeeId)
        {
            var employee = employees.getEmployeeById(id);
            $("#txtEmployeeId").val(employee.employeeId);
            $("#txtEmployeeName").val(employee.employeeName);
            $("#txtJob").val(employee.job);
            $("#txtSalary").val(employee.salary);
        }
    }
}

function btnSearch_onclick(id) {
    var employee = employees.getEmployeeByName($("#txtSearchName").val());
    var employeelist = new EmployeeContainer();
    employeelist.addEmployee(employee);
    Init(employeelist);
}

Init(employees);