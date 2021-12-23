let b = document.getElementById('btn');
let tb=document.getElementById('td');
b.addEventListener("click",function(e)
{
    e.preventDefault();
    getDetails();
});

function getDetails()
{
   
    let un = document.getElementById('usern').value;
    let xhr = new XMLHttpRequest();
    let url="https://api.github.com/users/"+un
    xhr.open("GET", url , true);
    xhr.send();
    xhr.onload = function(){
        if(xhr.status == 200)
        {
          let data=JSON.parse(this.responseText);
          let row=`<tr>
                <td>${data.id}</td>
                   <td>${data.login}</td>
                   <td>${data.updated_at}</td>
                   <td>${data.created_at}</td>
                   <td>${data.public_repos}</td>
                   <td>${data.followers}</td>
                   <td>${data.following}</td>    
          </tr>`
          tb.innerHTML +=row;
          document.getElementById('a1').style.visibility="hidden";
          }
   else  if (un === "" || xhr.status != 200)
      {
            document.getElementById('a1').style.visibility="visible";
      }
   else {
            document.getElementById('a1').style.visibility="hidden";
        }
    }
}