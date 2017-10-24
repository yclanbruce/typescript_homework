"use strict";
$(function () {
    // 計算 button event
    $('#calculate').on('click', function () {
        var price = $('#price').val();
        var qty = $('#qty').val();
        var level = $('#level').val();
        var result = new DiscountCalculater().calculater(price, qty, level);
        $('#result').text(result);
    });
});
// 會員 Enum
var Level;
(function (Level) {
    Level[Level["VIP"] = 1] = "VIP";
    Level[Level["Normal"] = 2] = "Normal";
})(Level || (Level = {}));
// 一般會員折扣
var NormalDiscounter = /** @class */ (function () {
    function NormalDiscounter() {
    }
    NormalDiscounter.prototype.GetDiscount = function (price, qty) {
        if (price * qty >= 1000 && qty > 3) {
            return 0.85;
        }
        else {
            return 1;
        }
    };
    return NormalDiscounter;
}());
// VIP 會員折扣
var VIPDiscounter = /** @class */ (function () {
    function VIPDiscounter() {
    }
    VIPDiscounter.prototype.GetDiscount = function (price, qty) {
        if (price * qty >= 500) {
            return 0.8;
        }
        else {
            return 1;
        }
    };
    return VIPDiscounter;
}());
// 計算價格
var DiscountCalculater = /** @class */ (function () {
    function DiscountCalculater() {
    }
    DiscountCalculater.prototype.calculater = function (price, qty, level) {
        var item;
        var totalPrice = price * qty;
        if (level == Level.VIP) {
            var vip = new VIPDiscounter();
            totalPrice *= vip.GetDiscount(price, qty);
            return totalPrice;
        }
        else if (level == Level.Normal) {
            var normal = new NormalDiscounter();
            totalPrice *= normal.GetDiscount(price, qty);
            return totalPrice;
        }
        else {
            return totalPrice;
        }
    };
    return DiscountCalculater;
}());
//# sourceMappingURL=app.js.map