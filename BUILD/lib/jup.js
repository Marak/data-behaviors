(function( window, undefined ) {
  var JUP = (typeof JUP != "undefined") ? JUP : (function() {
      var Util = {
          translate: function (o, data) {
              var c = [], atts = [], count = 1, selfClosing = false;
              var replace = function(str, r) { try { return data[r]; } catch(ex) {} };
              for (var i in o) {
                  if (o.hasOwnProperty(i) ) {
                      count++;
                      if (o[i] && typeof o[i] == "object") {
                          if(Object.prototype.toString.call(o[i]) != "[object Array]") {
                              for(var attribute in o[i]) {
                                  if (o[i].hasOwnProperty(attribute)) {
                                      atts.push([" ", attribute, "=\"", o[i][attribute], "\""].join(""));
                                  }
                              }
                              c[i] = "";
                              c[0] = [c[0], atts.join("")].join("");
                          }
                          else {
                              c[i] = this.translate(o[i], data);
                          }
                      }
                      else {
                          c[i] = o[i].replace(/\{\{([^\{\}]*)\}\}/g, replace);
                      }
                      if(typeof c[0] == "string") {
                          selfClosing = false;
                          switch(c[0].toLowerCase()) {
                              case "area":
                              case "base":
                              case "basefont":
                              case "br":
                              case "hr":
                              case "input":
                              case "img":
                              case "link":
                              case "meta":
                                  selfClosing = true;
                              break;
                          }
                          c[0] = ["<", o[0], atts.join(""), (selfClosing ? "/>" : ">")].join("");

                          if(selfClosing == false) { 
                              c.push("</" + o[0] + ">"); 
                          }
                      }
                  }
              }
              if(count-1 == o.length) {
                  return [c.join("")];
              }
          }
      };

      return {
  		version: "0.2",
          data: function(str) {
              return ["{{", str, "}}"].join("");
          },
          html: function() {

              var args = Array.prototype.slice.call(arguments), structure = [], data = {};

              if(args.length == 2) {
                  structure = args[1];
                  data = args[0];
              }
              else {
                  if(Object.prototype.toString.call(args[0]) == "[object Array]") {
                      structure = args[0];
                  }
                  else {
                      data = args[0].data || null;
                      structure = args[0].structure;
                  }
              }
              if(Object.prototype.toString.call(data) == "[object Array]") {

                  var copystack = [];

                  for(var c=0; c < data.length; c++) {
                      copystack.push(Util.translate(structure, data[c])[0]);
                  }
                  return copystack.join("");
              }
              else if(data) {
                  for(var d=0; d < data.length; d++) {    
                      return Util.translate(args[2] ? structure : Util.translate(structure)[0], data[d]);
                  }
              }
              return Util.translate(structure)[0];
          },
          
          parse:function(items){


            if(typeof items == 'string'){
              var div = window.document.createElement('div');
              div.innerHTML = items;
              var elements = div.childNodes;
            }
            else{
              var elements = items;
            }

            var arr = [];

            for(var i = 0; i < elements.length; i++){
              var e = elements.item(i);
              //debug.log(e, e.childNodes.length)
              var ar = []

              var fff = false;

              // we have an empty node
              if(e.nodeName!='#text'){
                if(!e.attributes.length){

                   //debug.log(e.childNodes.item(0).nodeName);
                  //debug.log(e.childNodes.length);
                  //var child = parse2(e.childNodes);
                  //if(child.length){
                  //  arr.push(child);
                  //}


                  try{
                    var t = e.childNodes.item(0).nodeName;
                    if(t!='#text'){
                      var child = parse2(e.childNodes);
                      arr.push(child);
                    }
                    var text = e.childNodes.item(0).wholeText;
                    //var text = '';
                    if(text==''){

                    }
                  }
                  catch(err){
                    var t = "#text";
                    var text = '';
                  }

                  if(t!="#text"){
                    arr.push([e.nodeName]);
                    continue;
                  }
                  else{
                    fff =true;

                  }

                }
              }

              ar.push(e.nodeName);

              try{
                if(e.attributes.length){
                 var attr = {};
                 for(var x = 0; x < e.attributes.length; x ++){
                   var d = e.attributes.item(x);
                   attr[d.name] = d.value; 
                  }
                 ar.push(attr);
                }
              }
              catch(err){
                var attrs = ''; 
              }

              //debug.log(e);

              if(fff && text.length){
                ar.push(text);
              }
              arr.push(ar);



              //debug.log('adding new node');

              // push nodes attributes

              // push nodes innerHTML
              //arr.push('foooooo');

              //ARR.push(arr);

              fff=false;
            }

            return arr || '';
}

      };
  })();
  window.JUP = window.JUP = JUP;
})(window || exports);