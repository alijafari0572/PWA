function add(number) {
    return new Promise(function (resolve, reject) {
        if (number >= 4) {
            reject('You cannot have more than 4');
        }

        setTimeout(function () {
            resolve(number + 1);
        }, 1000);
    });
}

//promise
// add(4)
//     .then(function (res) {
//         console.log(res);
//     })
//     .catch(function (err) {
//         console.log(err);
//     });
//var age = 1;
add(1)
.then(add)
.then(add)
.then(add)
.then(add)
.then(add)
    .then(function (res) {
        console.log(res);
    })
    .catch(function (err) {
        console.log(err);
    });