$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.name);
    console.log('whatisthis',data);
  });

  $("content-one").on("click", function(){
    
  })

  $("content-two").on("click", function(){
    
  })

  $("content-three").on("click", function(){
    
  })

  $("content-four").on("click", function(){
    
  })

  $("content-five").on("click", function(){
    
  })
  $("content-six").on("click", function(){
    
  })











});
