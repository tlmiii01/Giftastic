var animals = ["cats", "dogs"];

function addSearchButton(animal) {
     
    var newButton = $("<button>");
    newButton.addClass("btn btn-success");
    newButton.attr("id", animal);
    newButton.text(animal);
    $("#button-row").append(newButton);
    
}

function loadButtons() {
    // Remove everything in button-row
    $("#button-row").empty();
    
    for (let i = 0; i < animals.length; ++i) {
        addSearchButton(animals[i]);
    }
}


$(document).ready(function() {
    loadButtons();
    
    $("#submitButton").on("click", (event) => {
        event.preventDefault();
       
        var newAnimal = $("#newItem").val();
        if ( newAnimal != "" ) {
            console.log(newAnimal);
            addSearchButton(newAnimal);
        }
    })



});