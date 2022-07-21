var num;

// function testp(){
    
//     $.postJSON( "https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP", {"mobile":+num}).done(function( json ) {
//         console.log( data.name ); // John
//         console.log( data.time ); // 2pm
//       },);
// }
// function testp(){
//     num = document.getElementById('testp').value;
//     $.post( "https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP", { mobile:+num } )
//   .done(function( json ) {
//       console.log(error);
//     //   sessions= json.sessions;
//   });
// }

function testp(){

    Product = new Object();
    Product.mobile = $("#testp").val();
    productAdd(Product);
}
function productAdd(product) {
    $.ajax({
      url: "https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP",
      type: 'POST',
      contentType: 
         "application/json;charset=utf-8",
      data: JSON.stringify(product),
      success: function (product) {
        console.log(product);  
      },
      // error: function (request, message, error) {
      //   handleException(request, message, error);
      // }
    });
  }