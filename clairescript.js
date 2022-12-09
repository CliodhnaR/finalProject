 $('input[type=button]').click(function() {
   if (validate()){
      alert("Thank you! Your information has been submitted");
   }
});

// validate form input
function validate() {
  let name = document.forms["myForm"]["lname"].value;
  let fname = document.forms["myForm"]["fname"].value;
  let phone = document.forms["myForm"]["phone"].value;
  let email = document.forms["myForm"]["email"].value;
  let goals = document.forms["myForm"]["goals"].value;

  if(fname == "" || name == ""){ //check if  name was inputted
    alert("Complete name must be inputted.");
    return false;
  } else if (phone == ""){ 
    alert("Phone number required.");
    return false;
  } else if (!(countnums(phone) == 7 || countnums(phone) == 10)){
    alert("Phone number is not correct length.")
    return false;
  } else if (email == ""){
    alert("Email required.");
    return false;
  } else if (goals == ""){
    alert("Goals required.");
    return false;
  }
   else if (counselor == ""){
     alert("Counselor preference required.")
     return false; 
   }
  return true;
} //end validate


//count the number of numbers in a string
function countnums(input){
  let count = 0;
  for (let i = 0; i < input.length; i++) {
          const element = input[i];       
          if (isFinite(element)) {
              count++;
          }
  }
  return count;
}//end countnums