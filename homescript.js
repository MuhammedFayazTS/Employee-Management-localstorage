// head = document.getElementById('heading');
// head.innerHTML = 'fayaz'

var Search = document.getElementById('search');
var result=document.getElementById('searchResults');
var AdminData = JSON.parse(localStorage.getItem('Admin'))
var head = document.getElementById('heading');
head.innerHTML+= ` ${AdminData.name}`;
var empDetails = document.getElementsByClassName('emp_Details');
var Sort =document.getElementById('sort');
var Table =document.getElementById('table');
var data;
var currentSearch;
var arr=[];
var toastContainer = document.getElementById('toast-container');


function logout(){
    window.location='./index.html'
    // localStorage.removeItem('Admin')
}
function empty(){
    empDetails[0].style.border='0';
    empDetails[0].placeholder=`Employee id`;
    empDetails[1].style.border='0';
    empDetails[1].placeholder=`Employee Name`;
    empDetails[0].classList.remove('important');
    empDetails[1].classList.remove('important');
}
function empSubmit(){
    var EmpDetails = {
        'Employee_ID': empDetails[0].value,
        'Employee_Name': empDetails[1].value,
        'Employee_Designation': empDetails[2].value,
        'Employee_Experience': empDetails[3].value,
        'Employee_Address': empDetails[4].value,
    }
    // console.log(EmpDetails);
    if(empDetails[0].value && empDetails[1].value !=='')
    {   
        localStorage.setItem(EmpDetails.Employee_ID,JSON.stringify(EmpDetails));
        [...empDetails].map(e=>e.value='');
        createToast('success');
        empty();
        
    }
    else{
        empDetails[0].style.border='1px solid #b71d2c';
        empDetails[0].placeholder=`* Employee id`;
        empDetails[1].style.border='1px solid #b71d2c';
        empDetails[1].placeholder=`* Employee Name`;
        empDetails[0].classList.add('important');
        empDetails[1].classList.add('important');
        createToast('danger');
    }
}

function defaultBorder(){
    empDetails[0].style.border='0';
}

function search(){
    
    data=JSON.parse(localStorage.getItem(Search.value));
    currentSearch =  Search.value;
    
    if(JSON.parse(localStorage.getItem(currentSearch)) !== null)
    {   
        result.innerHTML=`
        <div class="card"> 
        <button class="btn" onclick="exitCard()"><i class="fa-solid fa-xmark fa-lg"></i></button>
        <img src="./images/pngegg (1).png" class="w-50 d-grid mx-auto my-2 img-fluid" id="user" alt="user">
       <p class="">Employee ID : ${data.Employee_ID}</p>
        <p class="">Employee Name : ${data.Employee_Name}</p>
        <p class="">Employee Designation : ${data.Employee_Designation}</p>
        <p class="">Employee Experience : ${data.Employee_Experience}</p>
        <p class="">Employee Address : ${data.Employee_Address}</p>
        <button class="btn btn-remove my-1 d-grid mx-auto" onclick="removeCurrent(${data.Employee_ID})">Remove</button>
           </div>
           `
    }
    else{
        result.innerHTML=`
        <div class="container my-4"> 
        <img src="./images/Oops! 404 Error with a broken robot-cuate.svg" class="w-75 d-grid mx-auto" alt="Not Found">
           </div>
        
        `
    }
        
        }
        // Remove employee
        function removeCurrent(emp){
            if(confirm('Do you want to delete this employee details?'))
            {
                localStorage.removeItem(emp);
                result.innerHTML= '';
                location.reload();
            }
        }
        // edit employee
        function editCurrent(emp){
            empDetails[0].value = emp;
            empDetails[1].value = JSON.parse(localStorage.getItem(emp)).Employee_Name;
            empDetails[2].value = JSON.parse(localStorage.getItem(emp)).Employee_Designation;
            empDetails[3].value = JSON.parse(localStorage.getItem(emp)).Employee_Experience;
            empDetails[4].value = JSON.parse(localStorage.getItem(emp)).Employee_Address;
            document.documentElement.scrollTop = 0;
        }
        // close card
        function exitCard(){
            result.innerHTML= '' ;
        }
        // clear all employee
        function clearEmps()
        {
            if(confirm('Are you sure you want to delete all data?')){
                localStorage.clear();
                result.innerHTML= '' ;
                location.reload();
            }
        }


    keys = Object.keys(localStorage);
    i=keys.length;
    while(i--){
        arr.push(JSON.parse(localStorage.getItem(keys[i])))
    }
    
    arr.sort((a, b) => {
        return a.Employee_ID - b.Employee_ID;
    });
    
    
    
    
    
    arr.forEach(e=>{
        if(e.name!==AdminData.name){
            Table.innerHTML+=`
                     <tr>
                        <td>${e.Employee_ID}</td>
                        <td>${e.Employee_Name}</td>
                        <td>${e.Employee_Designation}</td>
                        <td>${e.Employee_Experience}</td>
                        <td>${e.Employee_Address}</td>
                        <td class="d-flex justify-content-center">
                        <button class="btn btn-edit  w-25"  onclick="editCurrent(${e.Employee_ID})"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn btn-remove  w-25"  onclick="removeCurrent(${e.Employee_ID})"><i class="fa-solid fa-trash"></i></button></td>
                        </tr>       
                        `
        }
    })



function displayDetails(){
    if(Table.classList.contains('d-none'))
    {
        Table.classList.remove('d-none')
    }
    else{
        location.reload()
        Table.classList.add('d-none')
    }
}




function sortEmp(){
    arr.sort((a, b) => {
        return a.Employee_Experience - b.Employee_Experience ;
    });
    // Table.innerHTML='';
    Table.innerHTML=`
    <thead>
    <tr>
        <th>id</th>
        <th>Name</th>
        <th>Designation</th>
        <th>Experience</th>
        <th>Address</th>
        <th class="text-center">Actions</th>
    </tr>
    </thead>
    `;
    arr.forEach(e=>{
        if(e.name!==AdminData.name){
            Table.innerHTML+=`
                     <tr>
                        <td>${e.Employee_ID}</td>
                        <td>${e.Employee_Name}</td>
                        <td>${e.Employee_Designation}</td>
                        <td>${e.Employee_Experience}</td>
                        <td>${e.Employee_Address}</td>
                        <td>
                        <button class="btn btn-edit  w-25"  onclick="editCurrent(${e.Employee_ID})"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn btn-remove  w-25"  onclick="removeCurrent(${e.Employee_ID})"><i class="fa-solid fa-trash"></i></button>
                        </td>
                        </tr>       
                        `
                    }
    })
}



// toast messages
let success = "Employee added Successfully";
let info = "Employee added Successfully";
let danger = "Fill all details";
 var closeToast = document.getElementById('closeToast');

function createToast(type){
    let message;
    let icon;
    if(type === 'success'){
        message = success;
        icon='<i class="fa-solid fa-user-plus"></i>';
    }
    else if(type === 'danger'){
        message = danger
        icon='<i class="fa-solid fa-xmark"></i>';
    }
    else{
        message = info;
    }
    let toastMessage = document.createElement('div');
    toastMessage.innerHTML=`
    <span>${icon}</span>
    <span>${message}</span>
    <button id="closeToast">×</button>
`
if(type === 'success'){
    toastMessage.classList.add('success');
    let message = success;
}
else if(type === 'danger'){
    toastMessage.classList.add('danger');
    let message = danger
}
else{
    toastMessage.classList.add('info');
    let message = info;
}
toastMessage.classList.add('toastMessage');
toastContainer.appendChild(toastMessage);


setTimeout(() => {
    toastMessage.classList.add('hide-toastMessage')
    setTimeout(() => {
        toastMessage.remove();
    }, 500);
}, 3000);
}




        // <button class="btn btn-danger" id="removeItem" onclick="clearAll()" >Remove</button>

