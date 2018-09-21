// We'll be rewriting the table's data frequently, so let's make our code more DRY
// by writing a function that takes in 'animals' (JSON) and creates a table body
function displayResults(routes) {
    // First, empty the table
    $("tbody").empty();
  
    // Then, for each entry of that json...
    routes.forEach(function(route) {
      // Append each of the animal's properties to the table
      $("tbody").append("<tr><td>" + route.wall + "</td>" +
                           "<td>" + route.setter + "</td>" +
                           "<td>" + route.grade + "</td>" +
                           "<td>" + route.style + "</td>" +
                           "<td>" + route.holdColor + "</td>" +
                           "<td>" + route.setDate + "</td>" +
                           "<td>" + route.removeDate + "</td>" +
                           "<td>" + route.notes + " <input type='text' id='title' /></td></tr>");
    });
  }
  
  // Bonus function to change "active" header
  function setActive(selector) {
    // remove and apply 'active' class to distinguish which column we sorted by
    $("th").removeClass("active");
    $(selector).addClass("active");
  }
  
  // 1: On Load
  // ==========
  
  // First thing: ask the back end for json with all animals
  $.getJSON("/all", function(data) {
    // Call our function to generate a table body
    displayResults(data);
  });
  
  // 2: Button Interactions
  // ======================
  
  // When user clicks the weight sort button, display table sorted by weight
  $("#grade-sort").on("click", function() {
    // Set new column as currently-sorted (active)
    setActive("#route-grade");
  
    // Do an api call to the back end for json with all animals sorted by weight
    $.getJSON("/grade", function(data) {
      // Call our function to generate a table body
      displayResults(data);
    });
  });
  
  // When user clicks the name sort button, display the table sorted by name
  $("#setter-sort").on("click", function() {
    // Set new column as currently-sorted (active)
    setActive("#route-setter");
  
    // Do an api call to the back end for json with all animals sorted by name
    $.getJSON("/setter", function(data) {
      // Call our function to generate a table body
      displayResults(data);
    });
  });
  