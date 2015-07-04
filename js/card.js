var cardNum = 3;

function Card(index) {
    var card = $("<div>")
    card.addClass("cardBox");
    
    var backBtn = $("<div>");
    backBtn.addClass("backBtn-area");
    
    var a = $("<a>");
    var span =$("<span>");
    span.addClass("txt");
    a.append(span);
    backBtn.append(a);
    card.append(backBtn);
    
    var divmv = $("<div>");
    divmv.addClass("mainVisual-area mainVisual");
    var spnmv = $("<span>");
    spnmv.addClass("stock-btn");
    var img = $("<img>");
    img.attr("src","img/011100130.jpg");
    
    var divol = $("<div>");
    divol.addClass("overlay");
    divol.text("レシピタイトル");
    
    divmv.append(spnmv);
    divmv.append(img);
    divmv.append(divol);
    card.append(divmv);
    
    var lbl = $("<div>");
    lbl.addClass("label-area");
    var spnlbl = $("<span>");
    spnlbl.addClass("label")
    spnlbl.text("日本酒");
    lbl.append(spnlbl);
    card.append(lbl);
    
    
    
    
    
    this.render = function (scrollY) {
        var offset = scrollY + index * 200;
        card.css({
            "top": Math.sin(offset / 540 * Math.PI) * 400 + 50 + "px",
            "left": Math.cos(offset / 540 * Math.PI) * 350 - 340 + "px",
            "transform": "rotateZ(" + offset / (6) + "deg)",
            "z-index": cardNum - index
        });
        $(".bg").css({
            "background-position": scrollY / 5 + "px " + scrollY * (-1) / 2 + "px"
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
    for (i = 0; i < cardNum; i++) {
        cards[i] = new Card(i);
        cards[i].render(scrollY);
        anchor.append(cards[i].getCard());
    }
    var intervalId = setInterval(function () {
        render(scrollY);
    }, 30);




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




    //レシピ詳細画面にいくときの挙動
    $(".cardBox").on("click", function (e) {


        currentDetail = this;
        if (isDetail) {
            return;
        }
        $(this).css({
            zIndex: 3
        })
        $(".nav-category").addClass("opc0");

        clearInterval(intervalId);
        isDetail = true;

        $(this).addClass("detailPage");
        $(".cardFrame").addClass("detailPage")
        var angle = getRotate($(this).css("transform")),
            top = parseInt($(this).css("top")),
            left = parseInt($(this).css("left")),
            height = parseInt($(this).find(" .content-area").css("height")) + 200,
            diffHeight = height - 350;

        var count = 0;
        $(this).animate({
            zIndex: 4
        }, {
            duration: 700,
            step: function (now) {
                $(this).css({
                    transform: 'rotateZ(' + angle * (4 - now) + 'deg)',
                    top: top * (4 - now) + 'px',
                    left: left * (4 - now) + 'px'
                        // height:350+diffHeight*(now-3)+"px"
                });
            },
            complete: function (now) {
                $(".nav-category").addClass("none");
                $(".backBtn-area").removeClass("none");
                $(this).animate({
                    height: height + "px"
                }, 700);

                $(this).find(".content-area").removeClass("showPage");
            }

        });
//        var nextPage = "detail0.html";
        history.pushState(null, null, "detail");
        addEventListener("popstate",function(e){
//            changeContents(location.pathname);
            history.pushState(null,null,"show.html");
        },false);
        
        //戻るボタンを押したときの挙動
        $(".backBtn-area").click(function (e) {
            console.log(scrollY);
            $(this).addClass("none");
            isDetail = false;

            console.log(currentDetail);
            $(currentDetail).removeClass("detailPage");
            $(".cardFrame").removeClass("detailPage");
            $(".nav-category").removeClass("opc0");
            $(currentDetail).animate({
                height: 350 + "px"
            }, 700);
            //animation
            $(currentDetail).animate({
                zIndex: 3
            }, {
                duration: 700,
                step: function (now) {
                    $(currentDetail).css({
                        transform: 'rotateZ(' + angle * (4 - now) + 'deg)',
                        top: top * (4 - now) + 'px',
                        left: left * (4 - now) + 'px'
                            // height:350+diffHeight*(now-3)+"px"
                    });
                },
                complete: function (now) {
                    $(".nav-category").removeClass("none");
                    $(".backBtn-area").addClass("none");

                    $(currentDetail).find(".content-area").addClass("showPage");
                    intervalId = setInterval(function () {
                        render(scrollY);
                    }, 30);
                }
            });
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

function addStocked(el) {
    var target = $(el).attr("class");
    if (target == "stock-btn") {
        $(el).addClass("stocked");
    } else {
        $(el).removeClass("stocked");
    }

}
