var cardNum = 3;

function Card(index) {
  var card = $("<div></div>");
  card.addClass("cardBox");
  card.load("./detail"+index+".html .content-area",function(data){
    if(data==null){
      $(this).append("読み込みに失敗");
    }
  });
//   var imgUrl = card.find(".content-area .mainVisual-area img");
//    console.log(imgUrl);
//   var bg = $("<div></div>");
//    bg.addClass("cardBg");
//    bg.css({
//
//    });

  this.render = function (scrollY) {
    var offset = scrollY + index * 200;
    card.css({
      "top": Math.sin(offset / 540 * Math.PI) * 400 + 50 + "px",
      "left": Math.cos(offset / 540 * Math.PI) * 350 - 340 + "px",
      "-webkit-transform": "rotateZ(" + offset / (6) + "deg)",
      "z-index": cardNum - index
    });
      $(".bg").css(
      {
          "background-position":scrollY/5+"px "+scrollY*(-1)/2+"px"
      });
  }
  this.getCard = function () {
    return card;
  }
}

function main() {
  console.log("main");
    console.log($("#box:before").css("background-position"));
  var cards = [];
  var isDetail = false;
  for (i = 0; i < cardNum; i++) {
    cards[i] = new Card(i);
    cards[i].render(scrollY);
    cards[i].getCard().appendTo("#box");

  }
  var intervalId = setInterval(function () {
    render(scrollY);
  }, 30);




  function render(scrollY) {
    console.log(scrollY);
    for (i = 0; i < cardNum; i++) {
      cards[i].render(scrollY);
    }
  }
  var anchor = document.getElementById("box");
  var lastY = 0,
    scrollY = 0;
  anchor.addEventListener("touchstart", function (e) {
    lastY = e.touches[0].pageY;
  });
  anchor.addEventListener("touchmove", function (e) {

    if (isDetail) {
       console.log("touchmove");
      return;
    }
    var pageY = e.touches[0].pageY;
    scrollY += pageY - lastY;
    lastY = pageY;

  });


  $(".cardBox").click(function (e) {
    if(isDetail){
      return;
    }
    $(this).css({
      zIndex: 3
    })
    $(".nav-category").addClass("opc0");
    isDetail = true;
    clearInterval(intervalId);

    $(this).addClass("detailPage");
    $(".cardFrame").addClass("detailPage")
    var angle = getRotate($(this).css("transform")),
      top = parseInt($(this).css("top")),
      left = parseInt($(this).css("left")),
      height=parseInt($(this).find(" .content-area").css("height"))+200,
        diffHeight=height-350;

    var count = 0;
    $(this).animate({
      zIndex: 4
    }, {
      duration: 700,
      step: function (now) {
        $(this).css({
          transform: 'rotateZ(' + angle * (4 - now) + 'deg)',
          top: top * (4 - now) + 'px',
          left: left * (4-now) + 'px'
          // height:350+diffHeight*(now-3)+"px"
        });
      },
      complete:function(now){
         $(".nav-category").addClass("none");
        $(this).animate({
           height:height+"px"
        },700);

         $(this).find(".content-area").removeClass("showPage");
      }
    });

  });

}
main();

function getRotate(t) {
  var m = new WebKitCSSMatrix(t);
  var a = m.a,
    b = m.b;
  var scale = Math.sqrt(a * a + b * b);
  var sin = b / scale;
  var angle = Math.round(Math.asin(sin) * (180 / Math.PI));
  return angle;
}
