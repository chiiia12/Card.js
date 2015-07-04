$(function(){
  $("#nextBtn").click(function(){
    console.log("nextBtn");
    $(".page").animate({
      marginLeft:"-250px"
    },"normal");
    $(".entry-nav-area li:nth-child(1)").removeClass("active");
    $(".entry-nav-area li:nth-child(2)").addClass("active");
  });
  $("#nextBtn2").click(function(){
      $(".page").animate({
        marginLeft:"-500px"
      },"normal");
  });
 $("#back").click(function(){
     $(".page").animate({
       marginLeft:"0px"
     },"normal");
 });
});
