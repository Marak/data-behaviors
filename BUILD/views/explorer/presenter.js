// presenter logic goes here

console.log('presenter binded to view');

$('#navOutput').machine({
 'state':"/",
 
 entered:function(state){
  alert(state);
 }
});

