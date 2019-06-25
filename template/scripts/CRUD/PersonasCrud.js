
function LastInsertId()
{
  let personas = GetAll();
  if(personas == null)
    return 0;

  let ids = [];
  personas.map(p=>{
    ids.push(p.id);
  })

  return ids.reduce(function(prev, curr)
  {
    return curr > prev ? curr : prev;
  },0);
}
function SaveArray(arr)
{
  console.log("saving array");
  console.log(arr);
  localStorage.setItem("personas", JSON.stringify(arr));
  var personas = GetAll();
  CrearTabla(personas);
}

function GetOne(id)
{
  let personas = GetAll();
  if(personas == null)
    personas = [];
  
  let persona = null;
  personas.map(p=>{
    if(p.id == id)
    {
      persona = p; 
    }
  });
  return persona;
}

function GetAll()
{
  return JSON.parse(localStorage.getItem("personas"));

}

function Create(persona)
{
  if(GetOne(persona.id) == null)
  {
    persona.id = LastInsertId()+1;
    let personas = GetAll();
    if(personas == null)
      personas = [];
    personas.push(persona);
    SaveArray(personas);
  }
    
}

function Update(persona)
{
  if(GetOne(persona.id))
  {
    let personas = GetAll();
    let ind = -1;
    personas.forEach(function(p,index)
    {
      if(p.id == persona.id)
      {
        ind = index;
      }
    });
    personas[ind] = persona;
    SaveArray(personas);
  }
}

function Delete(id)
{
  let personas = GetAll();
  let ind = -1;

  personas.forEach(function(p,index)
  {
    if(p.id == id)
    {
      ind = index;
    }
  });
  personas.splice(ind, 1);
  SaveArray(personas);
}

/* Server
var xhr;
let host = "http://localhost:3000/"; 

function LastInsertId()
{
  if(personas == null)
    return 0;

  let ids = [];
  personas.map(p=>{
    ids.push(p.id);
  })

  return ids.reduce(function(prev, curr)
  {
    return curr > prev ? curr : prev;
  },0);
}

function GetOne(id)
{
  return personas.filter(function(p)
  {
    return p.id == id;
  })[0];
}

function GetAll()
{
 
  xhr = new XMLHttpRequest();
  let url = host+"traer?collection=personas";
  xhr.open("GET", url, true);
  xhr.onreadystatechange = actualizarTabla;
  xhr.send();
  setSpinner();

}

function Create(persona)
{
   xhr = new XMLHttpRequest();
   let url = host+"agregar";
   xhr.onreadystatechange = notifyResponse;
   let body = 
   {
     'collection':'personas',
     "objeto":persona
   }
   xhr.open("POST", url, true);
   xhr.setRequestHeader("Content-type", "application/json");
   xhr.send(JSON.stringify(body));
   setSpinner();
}

function Update(persona)
{
  xhr = new XMLHttpRequest();
  let url = host+"modificar";
  xhr.onreadystatechange = notifyResponse;
  let body = 
  {
    'collection':'personas',
    'objeto':persona
  }
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify(body));
  setSpinner();
}

function Delete(id)
{
  xhr = new XMLHttpRequest();
  let url = host+"eliminar";
  xhr.onreadystatechange = notifyResponse;
  let body = 
  {
    'collection':'personas',
    'id':id
  }
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify(body));
  setSpinner();
}

function setSpinner(){
    let spinner = document.getElementById("spinner");
    if(spinner.style.display == "block")
    {
        spinner.style.display = "none";
    }
    else
    {
        spinner.style.display = "block";
    }
}

function notifyResponse()
{
    if(xhr.readyState == 4)
    {
        if(xhr.status == 200 )
        {
            let message = JSON.parse(xhr.responseText).message;
            alert(message);
            setSpinner();
            TraerPersonas();
        }
    }
}
function actualizarTabla() {
    if(xhr.readyState == 4)
    {
        if(xhr.status == 200 )
        {
            personas = JSON.parse(xhr.responseText).data;
            setSpinner();
            CrearTabla(personas);
        }
    }
}
*/