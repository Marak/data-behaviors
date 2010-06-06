// presenter logic goes here

debug.log('presenter binded to view');

$('#navOutput').machine({
 'state':"/",
 
 entered:function(state){
  alert(state);
 }
});

