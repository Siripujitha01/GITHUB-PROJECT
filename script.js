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
    console.log(un);
    xhr.open("GET", "https://api.github.com/users/siripujitha01", true);
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
          }
    }
}