var menuTrigger = document.getElementById("js-menu-trigger");
var wrapper = document.getElementById("js-wrapper");
var menu = document.getElementById("js-menu");
var grayLayer = document.getElementById("js-gray-layer");
menuTrigger.addEventListener("click", function(e){
  wrapper.className = "wrapper wrapper-shift";
});
grayLayer.addEventListener("click",function(e){
   wrapper.className="wrapper";
});

