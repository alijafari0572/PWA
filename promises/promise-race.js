
var add = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('ADD Value');
    }, 400);
});

var minus = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('MINUS Value');
    }, 500);
});

Promise.race([add, minus])
    .then(function (result) {
        console.log(result);
    })
    .catch(function (err) {
        console.log(err);
    });