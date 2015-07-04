function addStocked(el) {
  var target = $(el).attr("class");
  if (target == "stock-btn") {
    $(el).addClass("stocked");
  } else {
    $(el).removeClass("stocked");
  }

}
