// User input & currentHr
userInput = [];
currentHr = parseInt(moment().format("MMM Do YY")); 

// Show today
function currentDate(){
     today = moment().format('dddd, MMMM Do YYYY');
     $("#currentDay").text(today);
};
currentDate();


// lock button to let input stick & not go away when refresh 
$(".saveBtn").click(function(){
     //gather txt from this input area
        var inputTxt = $(this).siblings(".description").val();
     //get that id from this input
        var taskid = $(this).siblings(".description").attr("id");
     //create Obj
     inputObject={
         id: taskid, 
         text: inputTxt
        }
     //push input into the object
     userInput.push(inputObject);

     //save input
     saveInput();
});

// Save input into localStorage
function saveInput(){
    localStorage.setItem('input', JSON.stringify(userInput));
};

// retrieve input from localStorage
function loadInput(){
    var savedInput = localStorage.getItem('input');
    if (!savedInput){
        return false;
    }
    // return to as an array
    userInput = JSON.parse(saveInput);

    // Input details
    for (i=0; i < userInput.length; i++){
        var inputTxt = userInput[i].text;
        var inputId = userInput[i].id;
        $('#'+inputId).val(inputTxt);
    }
    
    getChecked();

};
   

//Compare current times
function checkInput(inputElement){ 
    //Establish row hrs
    var rowHrs=parseInt($(inputElement).parent(".row").attr("id"));
    // Get rid of old classes from old data/time so it can be updated to compare
    $(inputElement).removeClass('present future past');
    // 2 if row is in past (this moment currentHr) then grey 
    if (rowHrs<currentHr){
        $(inputElement).addClass('past');
    }
    // 3 if row is in present  then blue 
    else if (rowHrs===currentHr){
        $(inputElement).addClass('present');
    }
    // 4 if row is in future  then green
    else if (rowHrs>currentHr){
        $(inputElement).addClass('future');
    }
};

function getChecked(){
    $(document).ready(function(){
        $(".description").each(function(){
            checkInput(this);
        });
    });
};

loadInput();

setInterval(function (){
    getChecked();
}, 60000);