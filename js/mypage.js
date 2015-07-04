$(function(){
   $(".history-thumb .fa-thumbs-o-up").click(function(){
       $(this).parent("a").attr("href","javascript:void(0)");
      $(this).addClass("like"); 
       $(this).parent("a").attr("href","msg.html");
   });
});