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

    var newCard = $("<div>");
    newCard.addClass("card col-sm-4");
    var tempDiv = $("<img>");
    tempDiv.addClass("card-img-top gif");
    tempDiv.attr("src", gif.images.fixed_height_still.url);
    // console.log(gif.images.fixed_height_still.url);
    tempDiv.attr("data-still", gif.images.fixed_height_still.url);
    tempDiv.attr("data-running", gif.images.fixed_height.url);
    tempDiv.attr("state", "still");
    newCard.append(tempDiv);

    tempDiv = $("<div>");
    tempDiv.addClass("card-body");
    tempDiv.append("<h5 class='card-title'>" + gif.rating + "</h5>");

    newCard.append(tempDiv);
    return newCard;

}


$(document).ready(function () {
    loadButtons();

    $("#submitButton").on("click", (event) => {
        event.preventDefault();

        var newAnimal = $("#newItem").val();
        if (newAnimal != "") {
            console.log(newAnimal);
            addSearchButton(newAnimal);
        }
    });

    $("#button-row").on("click", ".animal-button", function () {
        // console.log($(this));
        // console.log($(this).attr("data-name"));
        searchTerm = $(this).attr("data-name");
        // console.log(buildQuery());

        // AjaX call to get the GIFs
        $.ajax({
            url: buildQuery(),
            method: "GET"
        }).then((response) => {
            $("#gifImages").empty();
            for (let i = 0; i < numberOfGifs; i++) {
                $("#gifImages").append(buildGifCard(response.data[i]));
            }
        });
    });

    $("#gifImages").on("click", ".gif", function() {
        console.log($(this));

        var state = $(this).attr("state");
        console.log(state);

        if (state === "still") {
            $(this).attr("state", "running");
            $(this).attr("src", $(this).attr("data-running"));
        } else {
            $(this).attr("state", "still");
            $(this).attr("src", $(this).attr("data-still"));
            
        }
    });
});