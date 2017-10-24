$(function () {
    // 計算 button event
    $('#calculate').on('click', () => {
        let price: number = $('#price').val() as number;
        let qty: number = $('#qty').val() as number;
        let level: number = $('#level').val() as number;
        var result = new DiscountCalculater().calculater(price,qty,level);
        $('#result').text(result);
    });
});

// 會員 Enum
enum Level {
    VIP = 1,
    Normal = 2,
}

interface IDiscounter {
    GetDiscount(price: number, qty: number, level: number): number;
}

// 一般會員折扣
class NormalDiscounter implements IDiscounter {
    GetDiscount(price: number, qty: number) {
        if (price * qty >= 1000 && qty > 3) {
            return 0.85;
        }
        else {
            return 1;
        }
    }
}

// VIP 會員折扣
class VIPDiscounter implements IDiscounter {
    GetDiscount(price: number, qty: number) {
        if (price * qty >= 500) {
            return 0.8;
        }
        else {
            return 1;
        }
    }
}
// 計算價格
class DiscountCalculater {
    calculater(price:number,qty:number,level:number){
        var item:IDiscounter;
        let totalPrice = price * qty;
        if(level == Level.VIP){
            var vip = new VIPDiscounter();
            totalPrice *= vip.GetDiscount(price, qty);
            return totalPrice;
        }
        else if(level == Level.Normal){
            var normal = new NormalDiscounter();
            totalPrice *= normal.GetDiscount(price, qty);
            return totalPrice;
        }
        else{
            return totalPrice;
        }
    }
}