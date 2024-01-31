// var add = new Promise(function (resolve, reject) {
//     setTimeout(function () {
//         console.log('add resoleved');
//         resolve('ADD Value');
//     }, 400);
// });

// var minus = new Promise(function (resolve, reject) {
//     setTimeout(function () {
//         console.log('minus resoleved');
//         resolve('MINUS Value');
//     }, 400);
// });

// Promise.all([add, minus])
//     .then(function (result) {
//         console.log(result);

//     })
//     .catch(function (err) {
//         console.log(err);
//     });

var add = new Promise(function (resolve, reject) {
    setTimeout(function () {
       
        reject('ADD Reject');
    }, 400);
});

var minus = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('MINUS Value');
    }, 1000);
});

Promise.all([add, minus])
    .then(function (result) {
        console.log(result);

    })
    .catch(function (err) {
        console.log(err);
    });
