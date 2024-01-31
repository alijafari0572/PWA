// var xhr = new XMLHttpRequest();
// xhr.open('GET','https://reqres.in/api/users/2');
// xhr.responseType='json';

// xhr.onload = function (){
//     console.log(xhr.response);

// }

// xhr.onerror = function (){
//     console.log('Error !');

// }

// xhr.send();

// $.get('https://reqres.in/api/users/2',function(res){
//     console.log(res);
// });

fetch('https://reqres.in/api/users/2')
    .then(function (response) {
        console.log(response);
        return response.json();
    }).then(function(res){
       console.log(res);
        console.log(res.data);
    }).catch(function(err){ 
        console.log(err);
    });
