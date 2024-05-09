import {CustomerAr} from "../db/db.js";

 for (let i = 0; i < CustomerAr.length; i++) {
  $('#inputState').append($('<option>', {
   value: i,
   text: CustomerAr[i].customerId
  }));
 }