/* exported ajax */

function ajax(url, type, data={}, success=r=>console.log(r), dataType='html'){
  'use strict';
  $.ajax({url:url, type:type, data:data, success:success, dataType:dataType});
}
