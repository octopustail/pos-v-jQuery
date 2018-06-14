$(document).ready(function () {
    let items = loadAllItems(),
        promotion = loadPromotions();

    let allItem;


    let allItemInfo = function (items, promotion) {
        let allItem = [];

        for (let i = 0; i < items.length; i++) {
            let itemInfo = promotion[0].barcodes.find(function (value) {
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


    let generateItemTable = function (AllItems) {
        console.log('AllItems', AllItems);
        AllItems.map(function (e) {
            console.log(e)
            let td = `<tr><td>${e.name}</td><td>${e.unit}</td><td>${e.price}</td><td>${e.promotion}</td><tr>`
            $('.item-table').append(td)
        })
    };

    allItem = allItemInfo(items, promotion);
    generateItemTable(allItem);
})
;


