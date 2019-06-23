/* 适配器获取得到的广东城市数据，新的数据格式不一定能够适合原有的数据格式 */

const getGuangdongCity = function() {
    // const guangdongCity = [
    //     {
    //         name: 'shenzhen',
    //         id: 11,
    //     },
    //     {
    //         name: 'guangzhou',
    //         id: 12,
    //     },
    // ];
    const guangdongCity = {
        shenzhen: 11,
        guangzhou: 12,
        zhuhai: 13,
        shanwei: 14
    }
    return guangdongCity;
};

const render = function(fn) {
    console.log('开始渲染广东省地图');
    document.write(JSON.stringify(fn()));
};

const addressAdapter = function(oldAddressfn) {
    const address = {};
    const oldAddress = oldAddressfn();
    // for (let i = 0, c; (c = oldAddress[i++]); ) {
    //     address[c.name] = c.id;
    // }
    Object.keys(oldAddress).forEach(city=>{// 当传入的城市数据格式不一样的时候，转换格式
        address[city] = oldAddress[city];
    })
    return function() {
        return address;
    };
};

render(addressAdapter(getGuangdongCity));
