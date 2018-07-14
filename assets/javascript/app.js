
// debugger;
var ticketQueryURL="https://app.ticketmaster.com/discovery/v2/events.json?apikey=j3c9q4m90n44zYYlgilg9IL5rjkdY3Ux&keyword=";
var nytQueryUrl=0;
var table=$("<table>");

$(".button").on("click",function(){
    console.log(userSearch);
    var userSearch = $(".input").val();
    $ .ajax({
        url:ticketQueryURL + userSearch,
        method:"GET",
    }).then(function(response){
        console.log(response);
        
        for(var i=0;i<5;i++){
        //  Event Name
        $(".body").append(response._embedded.events[i].name);
        // // Event date
        $(".body").append(response._embedded.events[i].dates.start.localDate);
        // // Event Location
        $(".body").append(response._embedded.events[i]._embedded.venues[i].name);
        // // Ticket Price
        // $(".body").append(response._embedded.events[i]._embedded.venues[i].state.name);
        }
        //  $(".body").append($("<img>").attr("src",response._embedded.events["0"].images["0"].url));
         
    });

})
