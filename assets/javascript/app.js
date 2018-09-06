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

//Function to build a card with the GIF
function buildGifCard(gif) {
//     <div class="card" style="width: 18rem;">
//   <img class="card-img-top" src=".../100px180/" alt="Card image cap">
//   <div class="card-body">
//     <h5 class="card-title">Card title</h5>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <a href="#" class="btn btn-primary">Go somewhere</a>
//   </div>
// </div>

var newCard = $("<div>");
newCard.addClass("card");
var tempDiv = $("<img>");
tempDiv.addClass("card-img-top");
tempDiv.attr("src", gif.images.fixed_width_small.url);
console.log(gif.images.fixed_width_small.url);
newCard.append(tempDiv);

tempDiv = $("<div>");
tempDiv.addClass("card-body");
tempDiv.append("<h5 class='card-title'>" + gif.rating + "</h5>");

newCard.append(tempDiv);
return newCard;
    
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
        // console.log(buildQuery());
        
        // AjaX call to get the GIFs
        $.ajax({
            url: buildQuery(),
            method: "GET"
        }).then( (response) => {
            console.log(response);
            $("#gifImages").append(buildGifCard(response.data[0]));
        })
    });



});