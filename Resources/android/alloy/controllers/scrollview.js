function Controller() {
    function init() {
        var TiSmoothProgressBar = require("com.artanisdesign.tismoothprogressbar");
        Ti.API.info("module is => " + TiSmoothProgressBar);
        proxy = TiSmoothProgressBar.createSmoothProgressBar({
            height: Ti.UI.SIZE,
            top: -6,
            left: 0,
            width: Ti.UI.FILL,
            zIndex: 5,
            interpolator: TiSmoothProgressBar.ACCELERATE,
            strokeWidth: 11
        });
        $.scrollWindow.add(proxy);
        proxy.hide();
    }
    function showIt() {
        proxy.show();
        setTimeout(function() {
            hideIt();
            $.myLabel.text = "Well done..";
        }, 2e3);
    }
    function hideIt() {
        var animation = Titanium.UI.createAnimation({
            opacity: 0,
            duration: 120
        });
        var animationHandler = function() {
            animation.removeEventListener("complete", animationHandler);
            proxy.hide();
            proxy.opacity = 1;
        };
        animation.addEventListener("complete", animationHandler);
        proxy.animate(animation);
    }
    function deanim() {
        var animation = Titanium.UI.createAnimation({
            opacity: 0,
            duration: 120
        });
        var animationHandler = function() {
            animation.removeEventListener("complete", animationHandler);
            isEnd = true;
            startpos = 0;
            $.loader.opacity = 1;
            $.loader.width = 0;
        };
        animation.addEventListener("complete", animationHandler);
        $.loader.animate(animation);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "scrollview";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.scrollWindow = Ti.UI.createWindow({
        backgroundColor: "black",
        id: "scrollWindow",
        title: "ScrollView"
    });
    $.__views.scrollWindow && $.addTopLevelView($.__views.scrollWindow);
    init ? $.__views.scrollWindow.addEventListener("open", init) : __defers["$.__views.scrollWindow!open!init"] = true;
    $.__views.loader = Ti.UI.createView({
        id: "loader",
        backgroundColor: "#33b5e5",
        borderRadius: "2",
        top: "0",
        height: "5",
        width: "0",
        zIndex: "4"
    });
    $.__views.scrollWindow.add($.__views.loader);
    $.__views.scrollView = Ti.UI.createScrollView({
        id: "scrollView",
        top: "0",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false",
        height: Ti.UI.FILL,
        width: "100%",
        overScrollMode: Titanium.UI.Android.OVER_SCROLL_NEVER
    });
    $.__views.scrollWindow.add($.__views.scrollView);
    $.__views.myLabel = Ti.UI.createLabel({
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas at tellus ac enim fermentum vehicula id in nisl. Aliquam non dolor id urna consectetur lacinia ac sed quam. Donec egestas turpis id sem ultrices, ut gravida diam tristique. Fusce egestas varius faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin odio diam, viverra id risus quis, sagittis tempor erat. Integer pellentesque commodo erat, sit amet bibendum libero commodo ut.Ut molestie nec diam id vestibulum. Nunc neque justo, suscipit in nisl ut, molestie porta est. Nam id congue elit. Mauris ut sagittis dui. Cras mattis quam non tortor porttitor laoreet ut quis sem. Donec ac lacinia tellus. Quisque laoreet posuere eros porttitor laoreet. Sed vestibulum nibh vitae placerat vestibulum. Morbi elementum nisi quis purus ultrices dignissim. Aenean in posuere ante, id ultrices libero. Donec mattis placerat suscipit. Nam nec massa sapien. Phasellus nec neque nec libero bibendum egestas et id odio. Proin semper ac dui a iaculis. In fermentum tincidunt viverra. Aliquam erat volutpat.",
        id: "myLabel",
        height: "120%",
        color: "white",
        top: "10",
        left: "10",
        right: "10",
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP
    });
    $.__views.scrollView.add($.__views.myLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var proxy, sp = 0, startpos = 0, isEnd = true, pW = Ti.Platform.displayCaps.platformWidth, pH = Ti.Platform.displayCaps.platformHeight, pDf = Ti.Platform.displayCaps.logicalDensityFactor;
    $.scrollView.addEventListener("touchend", function() {
        deanim();
    });
    $.scrollView.addEventListener("touchmove", function(e) {
        if (sp) deanim(); else if (isEnd) {
            startpos = e.y;
            isEnd = false;
        } else {
            var w = e.y - startpos;
            $.loader.width = pW * (w / (pH - 200));
            if ($.loader.width >= pW / pDf) {
                showIt();
                $.loader.width = 0;
            }
        }
    });
    $.scrollView.addEventListener("scroll", function(e) {
        sp = e.y;
        e.cancelBubble = true;
    });
    __defers["$.__views.scrollWindow!open!init"] && $.__views.scrollWindow.addEventListener("open", init);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;