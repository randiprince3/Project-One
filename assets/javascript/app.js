var config = {
    apiKey: "AIzaSyBLQpKlUuikhGH1iWmpgIMfAFA6G8go0ro",
    authDomain: "project-one-bc508.firebaseapp.com",
    databaseURL: "https://project-one-bc508.firebaseio.com",
    projectId: "project-one-bc508",
    storageBucket: "project-one-bc508.appspot.com",
    messagingSenderId: "471673883230"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

var search = "";


$("#run-search").on("click",function(){

    event.preventDefault();
    var userSearch = $("#artist-search").val().trim();
    var ticketQueryURL="https://app.ticketmaster.com/discovery/v2/events.json?apikey=j3c9q4m90n44zYYlgilg9IL5rjkdY3Ux&keyword=";
    
 if (userSearch === "") {
    M.toast({html: 'You must enter something in the search bar', classes: "blue 1000"})
} else {
    database.ref().push({
        search: userSearch,
      });

    $ .ajax({
        url: ticketQueryURL + userSearch,
        method:"GET",
    }).then(function(response){
        console.log(response);
        
        $(".striped > tbody").empty();

        for(var i=0; i < 3; i++){
           var showName = response._embedded.events[i].name;

           var dates = response._embedded.events[i].dates.start.localDate;
           var randomFormat = "YYYY/MM/DD";
           var convertedDate = moment(dates, randomFormat);
           var artistDate = moment(convertedDate).format("MM/DD/YY");

           var venue = response._embedded.events[i]._embedded.venues[0].name;
           var cityName = response._embedded.events[i]._embedded.venues[0].city.name;
           var eventLink = $('<a>').attr('href', response._embedded.events[i].url).attr('target', '_blank').append(showName);
        
           var newRow = $("<tr>").append(
            $("<td>").html(eventLink),
            $("<td>").text(venue),
            $("<td>").text(artistDate),
            $("<td>").text(cityName),
            );

          $(".striped > tbody").append(newRow);
        }
         
    });

    var queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=bc8827527e974e0dba93f18bb17c76a3&q=" + userSearch;
    console.log(queryURL);

    $(".card-content").html("<h5>Current Events for " + userSearch.substring(0,1).toUpperCase() + userSearch.substring(1).toLowerCase() + "</h5>").addClass("new-info");
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        $("#article-section").empty();

        for (var i = 0; i < 3; i++) {
            var articleDiv = $("<p>");
            var headline = response.response.docs[i].headline.main;
            
            articleDiv.html("<u><strong>" + headline + "</strong></u>").addClass("headline-style");

            $("#article-section").append(articleDiv);

            console.log(headline);

            var snippet = response.response.docs[i].snippet;
            var openLink = $('<a>').attr('href', response.response.docs[i].web_url).attr('target', '_blank').append(snippet);
                
            var showURL = $("<p>").append("Link: ", openLink);
            
            $(articleDiv).append(showURL);

        }
    
    });
}
    $("#artist-search").val("");
    
    });