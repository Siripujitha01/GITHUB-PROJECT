let b = document.getElementById('btn');
let tb=document.getElementById('td1');
let tb2=document.getElementById('td2');
document.getElementById('tab1').style.visibility="hidden";
document.getElementById('tab2').style.visibility="hidden";
document.getElementById('repobtn').style.visibility="hidden";
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
                   <td>${data.updated_at}</td>
                   <td>${data.created_at}</td>
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
        console.log(reposdata)
        for(item in reposdata)
        {
          
          let row = `
         
          <tr>
          <td>${reposdata[item].name}</td>
          <td>${reposdata[item].updated_at}</td>
          <td>${reposdata[item].pushed_at}</td>
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