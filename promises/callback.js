function add(number, callback) {
    if (number > 10) {
        callback('you cannot have more than 10');
        return;
    }

    setTimeout(function () {
        callback(false, number + 1);
    }, 1000);
}

// console.log(add(1));
add(1, function (error, result) {
    if (error) {
        console.log(error);
        return;
    }
    console.log(result);
});
// add(1,function(res){
// add(res,function(res2){
// add(res2,function(res3){
//     console.log(res3);
// })
// });
// });

add(8, function (error, result1) {
    if (error) {
      console.log(error);
      return;
    }
    add(result1, function (error, result2) {
      if (error) {
        console.log(error);
        return;
      }
      add(result2, function (error, result3) {
        if (error) {
          console.log(error);
          return;
        }
        add(result3, function (error, result4) {
          if (error) {
            console.log(error);
            return;
          }
          add(result4, function (error, result5) {
            if (error) {
              console.log(error);
              return;
            }
            console.log(result5);
          });
        });
      });
    });
  });