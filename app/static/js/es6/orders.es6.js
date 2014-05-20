/*global ajax*/
/*jshint unused:false*/
(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('.menu').change(getMenu);
  }

  function getMenu(){
    var menu = $(this).val();
    var next = $(this).next();
    ajax(`/dishes/${menu}`, 'get', null, h=>{
      next.empty().append(h);
    });
  }
})();
