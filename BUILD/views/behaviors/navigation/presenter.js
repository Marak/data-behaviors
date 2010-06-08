// presenter logic goes here

debug.log('presenter binded to view');

//debug.log(state);


$('#navOutput').machine({
 'state':"#/forms",
 
 entered:function(state){
  alert(state);
 }
});

