import {CustomerAr} from "../db/db.js";

 export function refresh() {
  console.log("refreshed")
  $('#inputState').empty();
  for (let i = 0; i < CustomerAr.length; i++) {
   $('#inputState').append($('<option>', {
    value: i,
    text: CustomerAr[i].customerId
   }));
  }
 }