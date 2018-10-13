// Grab the articles as a json
$.getJSON("/articles", function (data) {
    // For each one
    data.forEach((val, i) => {
        // Display the apropos information on the page
        $("#articles").append("<h4 data-id='" + val._id + "'>" + val.title + "</h4>");
        $("#articles").append("<h5 data-id='" + val._id + "'>" + "<kbd>" + val.link + "</kbd></h5><br>");
    });

});


// Whenever someone clicks a p tag
$(document).on("click", "h4", function () {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    let thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
        // With that done, add the note information to the page
        .done(function (data) {
            console.log(data);
            // The title of the article
            $("#notes").append("<h3>" + data.title + "</h3>");
            // An input to enter a new title
            $("#notes").append("<input id='titleinput' name='title' class='form-control'>");
            // A textarea to add a new note body
            $("#notes").append("<br><textarea id='bodyinput' name='body' class='form-control' rows='7'></textarea><br>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote' class='btn btn-default btn-block'>Add New Note</button>");

            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                $("#titleinput").val(data.note.title);
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
            }
        });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    let thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                // Value taken from title input
                title: $("#titleinput").val(),
                // Value taken from note textarea
                body: $("#bodyinput").val()
            }
        })
        // With that done
        .done(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});