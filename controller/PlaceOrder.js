
 // $('#inputState').setAttribute("C005");

let testAr = [1,2,3,4,5,6];

 for (let i = 0; i < 10; i++) {
  $('#inputState').append($('<option>', {
   value: i,
   text: testAr[i]
  }));
 }