$(function () {
    let items = loadAllItems(),
        promotion = loadPromotions();

    let allItem;
    let selectItem = [];


    let allItemInfo = (items, promotion) => {
        let allItem = [];

        for (let i = 0; i < items.length; i++) {
            let itemInfo = promotion[0].barcodes.find((value) => {
                if (value === items[i].barcode) {
                    return value
                }
            });
            if (itemInfo) {
                allItem.push({
                    name: items[i].name,
                    barcode: items[i].barcode,
                    unit: items[i].unit,
                    price: items[i].price,
                    promotion: promotion[0].type
                })

            } else {
                allItem.push({
                    name: items[i].name,
                    barcode: items[i].barcode,
                    unit: items[i].unit,
                    price: items[i].price,
                    promotion: 'none'
                })
            }
        }


        return allItem;


    };

    let getSelection = () => {

        $('tbody tr').each((index, elem) => {
            let barcode = elem.getAttribute('barcode');
            let count = $(elem).children('.txt').children().val();
            let type = $(elem).children('.promo').attr('promp');
            if (barcode && count) {
                selectItem.push({
                    barcode: barcode,
                    count: count,
                    type: type
                })
            }
        });
        generateShoppingCart(selectItem, allItem);

    };
    let generateShoppingCart = (selectItem, allItem) => {
        let cart = '';

        for (let i = 0; i < selectItem.length; i++) {
            let item = allItem.find((value) => {
                return value.barcode == selectItem[i].barcode;
            });
            cart = `<p><span>商品名称:${item.name}</span><span>价格:${item.price}</span><span>数量:${selectItem[i].count}</span></p>`
        }

        $('.cart').append(cart)
            .append('<button class="confirm">确认结算</button><button class="cancel">取消</button>');
    };


    let generateItemTable = (AllItems) => {
        AllItems.map((e) => {
            let td = `<tr barcode="${e.barcode}"><td>${e.name}</td><td>${e.unit}</td><td>${e.price}</td><td class="promo" promp="${e.promotion}">${e.promotion}</td><td class="txt"><input type="text"></td><tr>`
            $('.item-table').append(td)
        })


    };

    let findItem = (item, allItem) => {
        return allItem.find((v) => {
            return v.barcode === item.barcode
        })
    };
    let countPrice = (price, count, promotion) => {
        let buget = 0;
        if (promotion === 'BUY_TWO_GET_ONE_FREE') {
            buget = Math.floor(count / 3) * price
        }

        return [(price * count - buget), buget];
    };
    let generateRecipt = (selectItem) => {
        let recipt = '';
        let total = 0,
            buget = 0;
        selectItem.map((value) => {
            let item = findItem(value, allItem);
            countPrice();
            let countprice = countPrice(item.price, value.count, item.promotion)
            total = total + countprice[0];
            buget = buget + countprice[1];
            recipt = recipt + `<tr><td>${item.name}</td><td>${item.price}</td><td>${value.count}</td><td>${item.promotion}</td><td>${countprice[0]}</td>`
        });

        $('.recipt').append(`<tr><th>商品</th><th>价格</th><th>数量</th><th>优惠</th><th>single</th>`)
            .append(recipt)
            .append(`<tr><td>总计:${total}</td><td>优惠:${buget}</td></tr>`)


    };

    let confirmCart = () => {
        $('.cart').hide();
        generateRecipt(selectItem)
    };

    let cancelCart = () => {

        $('.cart').remove();
    };

    let cancelOrConfirm = (e) => {
        if (e.target.className === 'cancel') {
            cancelCart();
        } else if (e.target.className === 'confirm') {
            confirmCart();
        }
    };

    allItem = allItemInfo(items, promotion);
    generateItemTable(allItem);

    $('#settlement').on('click', getSelection);


    $('.cart').on('click', cancelOrConfirm);


})
;



