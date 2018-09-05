var animals = ["cats", "dogs"];
var searchTerm;
var numberOfGifs = 10;

// Variables for API calls

function buildQuery() {
    var apiKey = "HotDTaBju1BKdzeosh4NfXZVRsKBVo2s";
    var baseURL = "http://api.giphy.com/v1/gifs/search";

    var newQuery = baseURL + "?api_key=" + apiKey;
    newQuery += "&q=" + searchTerm;
    newQuery += "&limit=" + numberOfGifs;

    return newQuery;
}

function addSearchButton(animal) {
     
    var newButton = $("<button>");
    newButton.addClass("btn btn-success animal-button");
    newButton.attr("data-name", animal);
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
    });

    $("#button-row").on("click", ".animal-button", function() {
        // console.log($(this));
        // console.log($(this).attr("data-name"));
        searchTerm = $(this).attr("data-name");
        console.log(buildQuery());

    });

});