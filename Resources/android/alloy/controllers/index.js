function Controller() {
    function openScrollView() {
        var scw = Alloy.createController("scrollview").getView();
        scw.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "black",
        exitOnClose: "true",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId0 = Ti.UI.createButton({
        title: "Pull to refresh on ScrollView",
        id: "__alloyId0"
    });
    $.__views.index.add($.__views.__alloyId0);
    openScrollView ? $.__views.__alloyId0.addEventListener("click", openScrollView) : __defers["$.__views.__alloyId0!click!openScrollView"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    __defers["$.__views.__alloyId0!click!openScrollView"] && $.__views.__alloyId0.addEventListener("click", openScrollView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;