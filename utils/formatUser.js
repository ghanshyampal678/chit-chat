let names=[];
function formatUser(name){

  names.push(name);

  return names;

}

function removeUser(remove){

  names.forEach((name,index)=>{
    if(name===remove){
      names.splice(index,1);
    }
  })

  return names;


}

module.exports={formatUser,removeUser}