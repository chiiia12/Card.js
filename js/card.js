var cardNum;


function Card(index,element) {
    var card= $(element);
    this.widthValue =  200;
    this.heightValue = 300;
    this.marginValue = 50;
    this.render = function (scrollY) {
        console.log(scrollY)
        var offset = scrollY + index * 200;
        card.css({
            "top": Math.sin(offset / 540 * Math.PI) * (this.heightValue+this.marginValue) + 50 + "px",
            "left": Math.cos(offset / 540 * Math.PI) * 350 - 340 + "px",
            "transform": "rotateZ(" + offset / (6) + "deg)",
            "z-index": cardNum - index
        });
    }
    this.getCard = function () {
        return card;
    }
}

function main() {
    var anchor = $("#box");
    var isDetail = false;
    var currentDetail;
    var cards=[];
    var intervalId = setInterval(function () {
        render(scrollY);
    }, 30);

    
    console.log($("#box>.card").length);
    cards = $("#box > .card");
    cardNum = cards.length;
    console.log(cards);
    console.log(cards.length)
    console.log(cards[0]);
    $("#box").text("");
    for(i=0;i<cards.length;i++){
        cards[i] = new Card(i,cards[i]);
        cards[i].render(scrollY);
        anchor.append(cards[i].getCard());
    }


    function render(scrollY) {
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

