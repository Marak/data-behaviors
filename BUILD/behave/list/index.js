debug.log(options);

/* ugly ass raw JS nested list builder, we should make this Mustache or at least easier to read */
this.render = function(values){
 var str = '<ul>';
 
 for(var key in values){
   
   if(typeof values[key]=='object' && values[key] != null){
     str+='<li>'+key+this.render(values[key])+'</li>';
   }
   else{
     if(values instanceof Array){
       str+='<li>'+values[key];
     }
     else{
       str+='<li>'+key;
       if(values[key]!=''){
         str+= ' : ' + values[key];
       }
     }
    str+='</li>';
   }
  }
 
 str+='</ul>';
 return str;
};

$(options.selector).html(this.render(options.data));
