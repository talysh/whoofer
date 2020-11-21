// When the page loads, grab and display all of our whoofs
$.get("/api/all", (data) => {
  if (data.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      const row = $("<div>");
      row.addClass("whoof");

      row.append("<p>" + data[i].author + " whoofed.. </p>");
      row.append("<p>" + data[i].body + "</p>");
      row.append(
        "<p>On " + new Date(data[i].created_at).toLocaleDateString() + "</p>"
      );

      $("#whoof-area").prepend(row);
    }
  }
});

// When user whoofs (clicks addBtn)
$("#whoof-submit").on("click", (event) => {
  event.preventDefault();

  // Make a newwhoof object
  const newwhoof = {
    // author: $("#author")
    //   .val()
    //   .trim(),
    body: $("#whoof-box")
      .val()
      .trim(),
    // createdAt: new Date()
    //   .toISOString()
    //   .slice(0, 19)
    //   .replace("T", " "),
  };

  console.log(newwhoof);

  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newwhoof)
    // On success, run the following code
    .then(() => {
      const row = $("<div>");
      row.addClass("whoof");
      row.append("<p>" + newwhoof.body + "</p>");
      row.append(
        "<p>On " + new Date(newwhoof.createdAt).toLocaleDateString() + "</p>"
      );

      $("#whoof-area").prepend(row);
    });

  // Empty each input box by replacing the value with an empty string
  $("#author").val("");
  $("#whoof-box").val("");
});
