'use strict';

var dishes = global.nss.db.collection('dishes');
var _ = require('lodash');

class Dish{

  static findByMenu(menu, fn){
    dishes.find({menu:menu}).toArray((e,d)=>fn(d));
  }

  static findAll(fn){
    dishes.find().toArray((e,d)=>fn(d));
  }

  static menu(fn){
    Dish.findAll(dishes=>{ //dishes is an array of dish objects
      var menus = _(dishes).map(d=>d.menu).uniq().value(); //converts the array of dish objects into an array of strings in this case the menu
      fn(menus);
    });
  }
}

module.exports = Dish;
