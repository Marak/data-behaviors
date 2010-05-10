// an argument call "options" is sent to every component by default
// any data you want to pass to a component, must be done through the options has

// options are all optional by default (perhaps build a way to verify / require options for each component to verify this)
/*
  options.data => contains the data model which will be used to generated this component.
  options.behaviors => contains behaviors which we will want to add to this component after its created

*/

this.render = function(values){
  var str = '<ul>';
  for(var key in values){
    if(typeof values[key]=='object' && values[key] != null){
      str+='<li>'+key+this.render(values[key])+'</li>';
    }
    else{
      str+='<li>'+key;
      if(values[key]!=''){
        str+= ' : ' + values[key];
      }
     str+='</li>';
   }
  }
  str+='</ul>';
  return str;
};

return this.render(options.data);