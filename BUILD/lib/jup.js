var sys = require('sys');
var eyes = require('./lib/eyes');



(function( window, undefined ) {

  var JUP = {};
  // Define a local copy of parseDOM JUP
  JUP.parseDOM = function(items, ARR){

      if(typeof ARR == 'undefined'){
        var ARR = [];
      }
      window.jQuery(items).each(function(i,e){
        if(window.jQuery(e).children().length){
          JUP.parseDOM(window.jQuery(e).children(), ARR);  
        }
        else{
          var arr = [];
          arr.push(window.jQuery(e)[0].tagName);
          if(window.jQuery(e)[0].attributes.length){
            var d = window.jQuery(e)[0].attributes;
            for(var i = 0; i < d.length; i++) {
              var attr = {};
              attr[d.item(i).name] = d.item(i).value;
              arr.push(attr);
            }
          }
          if(window.jQuery(e).html().length){
            arr.push(window.jQuery(e).html());
          }
          ARR.push(arr);
        }
     });
    return ARR;
  
  };
  window.JUP = window.JUP = JUP;

})(window);