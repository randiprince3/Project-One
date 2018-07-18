$(".button").on("click",function(){
    event.preventDefault();
    var ticketQueryURL="https://app.ticketmaster.com/discovery/v2/events.json?apikey=j3c9q4m90n44zYYlgilg9IL5rjkdY3Ux&keyword=";
    var userSearch = $("#artist-search").val().trim();

    $ .ajax({
        url: ticketQueryURL + userSearch,
        method:"GET",
    }).then(function(response){
        console.log(response);
        
        $(".responsive-table > tbody").empty();

        for(var i=0; i < 3; i++){
           var showName = response._embedded.events[i].name;

           var dates = response._embedded.events[i].dates.start.localDate;
           var randomFormat = "YYYY/MM/DD";
           var convertedDate = moment(dates, randomFormat);
           var artistDate = moment(convertedDate).format("MM/DD/YY");

           var venue = response._embedded.events[i]._embedded.venues[0].name;
           var cityName = response._embedded.events[i]._embedded.venues[0].city.name;
           var eventLink = showName.link(response._embedded.events[i].url);
        
           var newRow = $("<tr>").append(
            $("<td>").html(eventLink),
            $("<td>").text(venue),
            $("<td>").text(artistDate),
            $("<td>").text(cityName),
            );

          $(".responsive-table > tbody").append(newRow);
        }
         
    });

    var queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=bc8827527e974e0dba93f18bb17c76a3&q=" + userSearch;
    console.log(queryURL);

    $(".card-content").html("<h5>Current Events for " + userSearch.substring(0,1).toUpperCase() + userSearch.substring(1).toLowerCase() + "</h5>");

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        $("#article-section").empty();

        for (var i = 0; i < 3; i++) {
            var articleDiv = $("<p>");
            var headline = response.response.docs[i].headline.main;
            
            articleDiv.text(headline);

            $("#article-section").append(articleDiv);

            console.log(headline);

            var nytURL = response.response.docs[i].web_url;
            console.log(nytURL);
            var snippet = response.response.docs[i].snippet;
            var openLink = snippet.link(nytURL);
                
            var showURL = $("<p>").html("See the full article here: " + openLink);
            
            $(articleDiv).append(showURL);

        } 

    });

});
