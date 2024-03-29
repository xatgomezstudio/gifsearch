
$(document).ready(function () {
    var results;
    var gifImage;

    var gifCategories = ["Shrek", "Shrek the Halls", "Shrek Ever After"];

    function displayGif() {

        var gif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=yMG2TyZZ0rDvqEL6JxrdDWhY3py3HyYW&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                console.log(response);

                 results = response.data;

                for (var i = 0; i < results.length; i++) {

                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                        var gifDiv = $("<div>");
                        var rating = results[i].rating;
                        var pRating = $("<p>").text("Rating: " + rating);




                         gifImage = $("<img data-animate=" + results[i].images.fixed_height.url +" data-state='animate' data-still=" + results[i].images.fixed_height_still.url + ">");

                        gifImage.addClass("giphy");
                        gifImage.attr("src", results[i].images.fixed_height.url);

                        gifDiv.append(pRating);
                        gifDiv.append(gifImage);

                        $("#gif-view").prepend(gifDiv);
                    }
                };
            });

            $("#gif-view").on("click", ".giphy", function () {
                // var animate = gifImage.attr("src", results[i].images.fixed_height.url);
                // var still = gifImage.attr("src", results[i].images.original_still.url);
        
                // console.log(this);
                // if (this === results[i].images.fixed_height.url) {
                //     $(this).attr("src", results[i].images.fixed_height.url);
                // } else {
                //     $(this).attr("src", results[i].images.original_still.url);
                // }

                var state = $(this).attr("data-state");

                if (state === "still") {

                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate")
                }

                else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still")
                }
        
            });
    };


    function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < gifCategories.length; i++) {
            var b = $("<button>");

            b.addClass("topics");
            b.attr("data-name", gifCategories[i]);
            // console.log(data);

            b.text(gifCategories[i]);
            $("#buttons-view").append(b);
        }

    };

    $("#find-gif").on("click", function (event) {

        console.log('clicked');

        event.preventDefault();
        var gif = $("#gif-input").val().trim();

        gifCategories.push(gif);
        console.log(gifCategories);
        renderButtons();
    });

    $(document).on("click", ".topics", displayGif);
    console.log('clicked');

    renderButtons();

});