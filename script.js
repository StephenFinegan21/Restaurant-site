
var logInForm = document.getElementById('log-in-form');     //Variable that holds the form for logging in
var menuForm = document.getElementById('place-order-form'); //Variable that holds the form for placing an order
var size = document.getElementById("burger-size");          //Stores size of burger that user chooses
var quantity = document.getElementById("burger-quantity");  //Stores the amount of burgers user requests
var discount = document.getElementById("discount-code");
var totalCost = document.getElementById("total-cost");      //Stores the final cost of the order (including discount)
var orderInformation = document.getElementById("order-information");//Stores the order to display back to user after order is submitted


//Validation of the log-in details
function logIn(){
    var userName = document.forms["log-in-form"]["user-name"].value;
    var password = document.forms["log-in-form"]["password"].value;
    var message = ""; //A string which will hold error message (if any)
    
    if(userName === "" && password.length != 9){ //Username is blank and password is not 9 chars long
        message = "User name cannot be empty and password must be exactly 9 characters long";
        alert(message);
    }
    else if(password.length !== 9){ //Only Password not valid
        message = "Password must be exactly 9 characters";
        alert(message);
    }
    else if(userName === ""){ //Only Username not valid
        message = "Username cannot be empty";
        alert(message);
    }
    else{
        showMenu(); //Username and password ARE valid , now show the menu form
    }
}

//Once login is validated this function shows the menu
function showMenu(){
        logInForm.classList.add('hide-form'); //hides log in form
        logInForm.classList.remove('show-form'); //removes 'show class' from log in form (hides)
        menuForm.classList.add('show-form'); //shows the menu form
 }
   
   
//Validates the users order
function validateOrder(){
    if(size.value == 0 || quantity.value == ''){//size is default (0) or nothing input for quantity
        alert("please choose a burger size and quantity");
    }
    else{
        $("#order-confirmed-background").show("slow"); //Show thes divs slowly, looks better visually
        $("#order-confirmed-content").show("slow");
        var text = size.options[size.selectedIndex].text; //var that holds the size of burger the user selected
        orderInformation.innerHTML =  quantity.value + " " +  text  + " burgers are on the way"; //text of the order-information h2 displays these values
    }
}

//Check if the discount code is valid
function showCost(){
    var finalCost; //var that holds the numeric amount of price including discount
    
    if(discount.value === "tacotopping"){ //If discount-code is valid
        finalCost = (quantity.value * size.value) * 0.9;  //quantity * value, then take 10% off
        totalCost.innerHTML =  "€" + finalCost.toFixed(2);//round to 2 decimal places 
    }
    else{
        finalCost = quantity.value * size.value;//no 10% discount
        totalCost.innerHTML =  "€" + finalCost.toFixed(2);
    }
    if(size.value === "17.50"){//if the supersize was selected
        warningMessage();
    }
}

//Function to display the Supersize warning stipulation message
function warningMessage(){
    $("#supersize-warning").show();//Shows the message but opacity is 0 so invisible
    $("#supersize-warning").animate({'opacity': '100%'});//Fading the message in
}

/**
 * After the user clicks submit and the order is displayed, user has 2 choices
 */

//Can logout, which refreshes and brings user back to the login screen
function logOut(){
    location.reload();
}

//Or back to the menu page by hiding the order content information
function backToMenu(){
    $("#order-confirmed-background").hide();
    $("#order-confirmed-content").hide();
}




//Hides the Supersize Warning and order confirmation divs on page load
$(document).ready(function() {
    $("#supersize-warning").hide();
    $("#order-confirmed-background").hide();
    $("#order-confirmed-content").hide();
});

/**Because I'm not storing the login input details I dont want to submit the form as it will not hide this section and show the order form.
 * I would not need this section in a real case as I would be getting the input, possibly with PHP
 * The log in form listens for the submit to be clicked, but then stops the form being being submitted and runs the login function.           **/
logInForm.addEventListener('submit', e => {
	e.preventDefault();
	logIn();
});

//Similiar to the login form we dont actually want to submit a form
menuForm.addEventListener('submit', e => {
    e.preventDefault();
     validateOrder(); //Run this if the submit button is clicked on the order page
});


/**Every time a key is pressed on the order input form, run the showCost function
 * This updates the price every time an input is changed by the user */
 $(function()
 {
    $(".order-input").on("change keyup",showCost);
});



