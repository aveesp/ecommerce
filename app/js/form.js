var formObj = {
    name: null,
    surname: null,
    email: null,
    phone: null,
    password: null
}

function formValidation(event) {
    event.preventDefault();
    var name = document.registrationForm.name;
    var surname = document.registrationForm.surname;
    var email = document.registrationForm.email;
    var phone = document.registrationForm.phone;
    var password = document.registrationForm.password;


    if(validateName(name))
    {
    if(validateSurname(surname))
    {
    if(validateEmail(email))
    {
    if(validatePhone(phone))
    {
    if(validatePassword(password))
    {


    }
    } 

    }
    }
    }
    console.log(this.formObj);
    alert('Data Saved Success fully [Name: '+ this.formObj.name + ", surname: "+ this.formObj.surname + ", Email: "+ this.formObj.email + ", Phone: "+ this.formObj.phone + ", Password: " + this.formObj.password + "]");
    return false;
}

// validate name
function validateName(name){
    var err = document.getElementById('nameErr');
    var letters = /^[A-Za-z]+$/;
    if(name.value.match(letters)){
        formObj.name = name.value;
        name.style.border = '1px solid #ccc';
        err.style.display = 'none';
        return true;
    }
    else{
        name.style.border = 'solid 1px #a94442';
        err.innerHTML = 'Enter Your Name';
        err.style.display = 'block';
        name.focus();
        return false;
    }
}

// validate surname
function validateSurname(surname){
    var err = document.getElementById('surnameErr');
    var letters = /^[A-Za-z]+$/;
    if(surname.value.match(letters)){
        formObj.surname = surname.value;
        surname.style.border = '1px solid #ccc';
        err.style.display = 'none';
        return true;
    }
    else
    {
        surname.style.border = 'solid 1px #a94442';
        err.innerHTML = 'Enter your surname must have alphabet characters only';
        err.style.display = 'block';
        surname.focus();
        return false;
    }
}

// email validation
function validateEmail(email){
    var err = document.getElementById('emailErr');
    var mailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.value.match(mailRegEx)){
        formObj.email = email.value;
        email.style.border = '1px solid #ccc';
        err.style.display = 'none';
        return true;
    }
    else{
        email.style.border = 'solid 1px #a94442';
        err.innerHTML = 'You have entered an invalid email address!';
        err.style.display = 'block';
        email.focus();
        return false;
    }
}

// phone validation
function validatePhone(phone) { 
    var err = document.getElementById('phoneErr');
    var phoneRegEx = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    // console.log(phone.value.match(phoneRegEx));
    if(phone.value.match(phoneRegEx)){
        formObj.phone = phone.value;
        phone.style.border = '1px solid #ccc';
        err.style.display = 'none';
        return true;
    }
    else
    {
        phone.style.border = 'solid 1px #a94442';
        err.innerHTML = 'Phone number should be in +XX XXXX XXXX this format';
        err.style.display = 'block';
        phone.focus();
        return false;
    }
}

// password validation
function validatePassword(){
    var err = document.getElementById('passwordErr');
    var passRegex = /^(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/;
    var password = document.getElementById("password");
    if (!passRegex.test(password.value)) {
        password.style.border = 'solid 1px #a94442';
        err.innerHTML = 'Password must be at least 8 long and contain at least 1 special character';
        err.style.display = 'block';
        password.focus();
        return false;
    } else {
        formObj.password = password.value;
        password.style.border = '1px solid #ccc';
        err.style.display = 'none';
        return true;
    }
}