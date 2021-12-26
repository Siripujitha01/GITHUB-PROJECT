let b = document.getElementById('btn');
let tb=document.getElementById('td1');
let tb2=document.getElementById('td2');
document.getElementById('tab1').style.visibility="hidden";
document.getElementById('tab2').style.visibility="hidden";
document.getElementById('repobtn').style.visibility="hidden";
let actdt,actmonth, actyear;

let btn2 = document.getElementById('repobtn');

b.addEventListener("click",function(e)
{
    e.preventDefault();
    getDetails();
});
btn2.addEventListener("click",function(e)
{
    e.preventDefault();
    getUserRepos();
});
function getDetails()
{
   
    let un = document.getElementById('usern').value;
    let xhr = new XMLHttpRequest();
    let url="https://api.github.com/users/"+un
    xhr.open("GET", url , true);
    xhr.send();
    xhr.onload = function()
    {
        

        if(xhr.status == 200)
        {
          let data=JSON.parse(this.responseText);
          let update = new Date(data.updated_at);
        let dt1 = update.getDate()+"-"+(update.getMonth()+1)+"-"+update.getFullYear()
        let createdate = new Date(data.created_at);
        let dt2 = createdate.getDate()+"-"+(createdate.getMonth()+1)+"-"+createdate.getFullYear()
          let row=`<tr>
          <td>id</td>
          <td>Username</td>
            <td>Updated At</td>
            <td>Created At</td>
            <td>Public Repos</td>
            <td>Followers</td>
            <td>Following</td>
                </tr>
                <tr>
                <td>${data.id}</td>
                   <td>${data.login}</td>
                   <td>${dt1}</td>
                   <td>${dt2}</td>
                   <td>${data.public_repos}</td>
                   <td>${data.followers}</td>
                   <td>${data.following}</td>    
          </tr>`
          tb.innerHTML =row;
          document.getElementById('a1').style.visibility="hidden";
          document.getElementById('tab1').style.visibility="visible";
          document.getElementById('repobtn').style.visibility="visible";
          document.getElementById('tab2').style.visibility="hidden";
          
         

          }
   else  if (un === "" || xhr.status != 200)
      {
            document.getElementById('a1').style.visibility="visible";
            document.getElementById('tab1').style.visibility="hidden";
            document.getElementById('repobtn').style.visibility="hidden";
            document.getElementById('tab2').style.visibility="hidden";
      }
   else {
            document.getElementById('a1').style.visibility="hidden";
            document.getElementById('tab1').style.visibility="hidden";
            document.getElementById('repobtn').style.visibility="hidden";
            document.getElementById('tab2').style.visibility="hidden";
        }
    }  
}  
function getUserRepos()
{
    let un = document.getElementById('usern').value;
    let xhr1 = new XMLHttpRequest();
    let url= `https://api.github.com/users/${un}/repos`
    xhr1.open("GET", url , true);
    xhr1.send();
    xhr1.onload = function()
    {
      if(xhr1.status === 200)
      {
        
        let reposdata = JSON.parse(this.responseText)
        for(item in reposdata)
        {
          let datecreated = new Date(reposdata[item].created_at);
          let createddt = datecreated.getDate()+"-"+(datecreated.getMonth()+1)+"-"+datecreated.getFullYear() 
          let dateupdated = new Date(reposdata[item].updated_at);
          let updatedt = dateupdated.getDate()+"-"+(dateupdated .getMonth()+1)+"-"+dateupdated .getFullYear()
          let creayear = datecreated.getFullYear();
          let updateyear = dateupdated .getFullYear();
          let creamonth = datecreated.getMonth()+1;
          let updatemonth = dateupdated .getMonth()+1;
          let creadt = datecreated.getDate();
          let updt = dateupdated.getDate();
          if(updt < creadt)
          {
            updatemonth -= 1;
            updt += 30;
          }
          if(updatemonth < creamonth)
          {
            updateyear -= 1;
            updatemonth += 12;
          }
          actdt = updt - creadt;
          actmonth = updatemonth - creamonth;
          actyear = updateyear - creayear;
          let totaldays = actdt + actmonth*30+ actyear *365;
          let datepushed = new Date(reposdata[item].pushed_at);
          let pusheddt = datepushed.getDate()+"-"+(datepushed.getMonth()+1)+"-"+datepushed.getFullYear()
          let dateupdated = new Date(reposdata[item].updated_at);
          let updatedt = dateupdated.getDate()+"-"+(dateupdated.getMonth()+1)+"-"+dateupdated.getFullYear()
          
          let row = `
         
          <tr>
          <td>${reposdata[item].name}</td>
          <td>${createddt}</td>
          <td>${updatedt}</td>
          <td>${totaldays+"days"}</td>
          </tr>
          
         `
         tb2.innerHTML += row;
         document.getElementById('a1').style.visibility="hidden";
         document.getElementById('tab1').style.visibility="visible";
         document.getElementById('tab2').style.visibility="visible";
         document.getElementById('repobtn').style.visibility="visible";
         
        }
      }
      else
      {
         tb2.innerHTML = "Error please reload the page and check the username"
      }
    }

}
