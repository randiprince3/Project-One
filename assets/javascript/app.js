
// debugger;
var ticketQueryURL="https://app.ticketmaster.com/discovery/v2/events.json?apikey=j3c9q4m90n44zYYlgilg9IL5rjkdY3Ux&keyword=";
var nytQueryUrl=0;
var table=$("<table>");

$(".button").on("click",function(){
    console.log(userSearch);
    var userSearch = $("#artist-search").val();
    $ .ajax({
        url:ticketQueryURL + userSearch,
        method:"GET",
    }).then(function(response){
        console.log(response);
        
        for(var i=0;i<3;i++){
           var showName=response._embedded.events[i].name;
           var dates=response._embedded.events[i].dates.start.localDate;
           var venue=response._embedded.events[i]._embedded.venues[0].name;
           var cityName=response._embedded.events[i]._embedded.venues[0].city.name;
           var newRow = $("<tr>").append(
            $("<td>").text(showName),
            $("<td>").text(dates),
            $("<td>").text(venue),
            $("<td>").text(cityName)
          );

           $(".responsive-table > tbody").append(newRow);
        }
        
         
    });

});

// Randi Code
$(".button").on("click", function() {

    event.preventDefault();

    var artistInput = $("#artist-search").val().trim();

    var queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=bc8827527e974e0dba93f18bb17c76a3&q=" + artistInput;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        for (var i = 0; i < 3; i++) {
            var articleDiv = $("<p>")
            var article = response.response.docs[i].snippet
            
            articleDiv.text(article);
            $("#article-section").append(articleDiv);

            console.log(article);

            var nytURL = response.response.docs[i].web_url
                console.log(nytURL);
            var showURL = $("<p>").text("Link: " + nytURL);
            $(articleDiv).append(showURL);
        }
        

    });
});
