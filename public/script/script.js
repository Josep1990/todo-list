
$(".full-landing-image").ripples({
    resolution: 200,
    perturbance: 0.01,
});



$("ul").on("click", "li", function(){ //execute this code when a li is clicked insede an ul //.on() method
    $(this).toggleClass("completed");
});
