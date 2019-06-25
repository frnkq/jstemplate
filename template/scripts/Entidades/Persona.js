function Persona(nombre,apellido,edad, email,sexo, id){
    this.first_name = nombre;
    this.last_name = apellido;
    this.edad = edad;
    this.email = email;
    this.gender = sexo;
    this.id = id;
    return this;
}

function PersonaFromTableRow(tr)
{
    
    var first_name = tr.childNodes[0].innerText;
    var last_name = tr.childNodes[1].innerText;
    var email = tr.childNodes[1].innerText;
    var edad = tr.childNodes[2].innerText;
    var gender = tr.childNodes[3].innerText;
    var id = tr.childNodes[4].innerText;
    var p = new Persona(first_name, last_name,edad, email, gender, id);
    console.log(p);
    return p;
}

function PersonaToTableRow(p)
{
    let fields = GetFields(p);
 
    let tr = document.createElement("tr");
    tr.setAttribute("id", "persona_"+p["id"]);

    for(let j=0;j<fields.length;j++)
    {
        let td = document.createElement("td");
        td.innerText = p[fields[j]];
        td.style.cursor = "pointer";
        td.setAttribute("class", "td"+fields[j]);
        
        td.addEventListener("click", TdClick);
        if(td.innerText == "undefined")
            td.innerText = "";

        tr.setAttribute("class", "text-center");
        tr.appendChild(td);
    }
    return tr;
}


function GetFields(persona)
{
    let fields = [];
    for(field in persona)
    {
        if(persona.hasOwnProperty(field))
        {
            if(field != "active")
                fields.push(field);
        }
    }
    return fields;
}