const moment=require('moment');

function formatMessage(username,message){
 return  msg={
    message:message,
    userName:username,
    time:moment().format('h:mm a'),
  }
 
}



module.exports=formatMessage;