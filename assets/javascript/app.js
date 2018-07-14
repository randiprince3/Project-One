$("#run-search").on("click", function() {

    event.preventDefault();

    var artistInput = $("#artist-search").val().trim();

    var queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=bc8827527e974e0dba93f18bb17c76a3&q=" + artistInput;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        $("#article-section").empty();

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
    // var artistInput = $("#artist-search").val().trim();
    // var ticketQueryURL="https://app.ticketmaster.com/discovery/v2/events.json?apikey=j3c9q4m90n44zYYlgilg9IL5rjkdY3Ux&keyword=" + artistInput;

    
    // $ .ajax({
    //     url: ticketQueryURL,
    //     method:"GET"
    // }).then(function(response){
    //     console.log(response);
        
    //     for(var i=0; i<5; i++){
    //         var artistEvent = response._embedded.events[i].name;
    //         var artistVenue = response._embedded.events[i]._embedded.venues[i].name;
    //         var artistDate = response._embedded.events[i].dates.start.localDate;
    //         var artistPric = 
    //     //  Event Name
    //     $(".body").append(response._embedded.events[i].name);
    //     // // Event date
    //     $(".body").append(response._embedded.events[i].dates.start.localDate);
    //     // // Event Location
    //     $(".body").append(response._embedded.events[i]._embedded.venues[i].name);
    //     // // Ticket Price
    //     // $(".body").append(response._embedded.events[i]._embedded.venues[i].state.name);
    //     }
    //     //  $(".body").append($("<img>").attr("src",response._embedded.events["0"].images["0"].url));


});


// debugger