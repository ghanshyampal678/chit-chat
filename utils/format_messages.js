const moment=require('moment');

function formatMessage(username,message){
 return  msg={
    message:message,
    userName:username,
    time:moment().format('h:mm a'),
  }
 
}

let names=[];
function formatUser(name){

  names.push(name);

  return names;

}

module.exports=formatMessage;