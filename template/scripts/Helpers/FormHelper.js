
function HideForm()
{
    var formId = document.getElementById("divFrm");
    formId.style.display = "none";    
}
function ShowForm(persona) {
    var formId = document.getElementById("divFrm");
    formId.innerHTML = "";
    formId.innerText = "";
    var form = CrearForm(persona);
    formId.appendChild(form);
    formId.style.display = "block";
}

function CrearForm(persona)
{
    var form = document.createElement("form");
    form.setAttribute("class", "formStyle");
    var inputName = document.createElement("input");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("placeholder", "Nombre");
    inputName.setAttribute("id", "inputName");
    
    var inputApellido = document.createElement("input");
    inputApellido.setAttribute("type", "text");
    inputApellido.setAttribute("placeholder", "Apellido");
    inputApellido.setAttribute("id", "inputApellido");

    var inputEdad = document.createElement("input");
    inputEdad.setAttribute("type", "number");
    inputEdad.setAttribute("placeholder", "Edad");
    inputEdad.setAttribute("id", "inputEdad");

    var inputEmail = document.createElement("input");
    inputEmail.setAttribute("type", "email");
    inputEmail.setAttribute("placeholder", "Email");
    inputEmail.setAttribute("id", "inputEmail");

    var inputGenderM = document.createElement("input");
    inputGenderM.setAttribute("type", "radio");
    inputGenderM.setAttribute("name", "gender");
    
    var inputGenderF = document.createElement("input");
    inputGenderF.setAttribute("type", "radio");
    inputGenderF.setAttribute("name", "gender");
    
    var labelName = document.createElement("p");
    labelName.innerHTML = "Nombre<br>";

    var labelApellido = document.createElement("p");
    labelApellido.innerHTML = "Apellido<br>";

    var labelEdad = document.createElement("p");
    labelEdad.innerHTML = "Edad<br>";

    var labelEmail = document.createElement("p");
    labelEmail.innerHTML= "Email:<br>";
    
    var labelGender = document.createElement("p");
    labelGender.innerHTML = "Sexo:<br>";
    
    var labelMasculino = document.createTextNode("H");
    var labelFemenino = document.createTextNode("M");


    var objects = [
        labelName,
        inputName,
        labelApellido, 
        inputApellido,
        labelEdad, 
        inputEdad,
        labelEmail, 
        inputEmail,
        labelGender, 
        inputGenderM, 
        labelMasculino,
        inputGenderF,
        labelFemenino,
        document.createElement("br")
    ];
    for(var i=0;i<objects.length;i++)
        form.appendChild(objects[i]);
    
    var buttons = CrudButtons();

    if(persona)
    {
        console.log(persona);
        form.setAttribute("id", "form_"+persona.id);
        inputName.value = persona.first_name;
        inputApellido.value = persona.last_name;
        inputEdad.value = persona.edad;
        inputEmail.value = persona.email;

        if(persona.gender == "Male")
        {
            inputGenderM.checked = true;
            inputGenderF.checked = false;
        }
        else
        {
            inputGenderM.checked = false;
            inputGenderF.checked = true;
        }
            

        form.appendChild(buttons["modificar"]);
        form.appendChild(buttons["eliminar"]);
    }
    else
    {
        form.appendChild(buttons["alta"]);
    }
    form.appendChild(buttons["cerrar"]);
    return form;
}

function CrudButtons()
{
    var btnAlta = document.createElement("input");
    btnAlta.setAttribute("type", "submit");
    btnAlta.setAttribute("value", "Agregar");

    var btnModificar = document.createElement("input");
    btnModificar.setAttribute("type", "submit");
    btnModificar.setAttribute("value", "Modificar");

    var btnEliminar = document.createElement("input");
    btnEliminar.setAttribute("type", "submit");
    btnEliminar.setAttribute("value", "Eliminar");

    var btnCerrar = document.createElement("input");
    btnCerrar.setAttribute("type", "submit");
    btnCerrar.setAttribute("value", "Cerrar");

    btnAlta.addEventListener("click", CreateEvent);
    btnModificar.addEventListener("click", UpdateEvent);
    btnEliminar.addEventListener("click", DeleteEvent);
    btnCerrar.addEventListener("click", CloseEvent);

    var buttons = [];
    buttons["alta"] = btnAlta;
    buttons["modificar"] = btnModificar;
    buttons["eliminar"] = btnEliminar;
    buttons["cerrar"] = btnCerrar;

    return buttons;
}

function CreateEvent(e)
{
    e.preventDefault();
    console.log("alta");
    var form = e.target.parentNode;
    var nombre = form.childNodes[1].value;
    var apellido = form.childNodes[3].value;
    var edad = form.childNodes[5].value;
    var email = form.childNodes[7].value;
    var sexo = "Female";
    if(form.childNodes[9].checked)
        sexo = "Male";
    
    if(nombre == "" || apellido == "" || email == "" || (!form.childNodes[9].checked && !form.childNodes[11].checked) )
    {
        alert("Debe llenar todos los campos");
        return;
    }
    
    if(email.split("@").length < 2 || email.split(".").length < 2)
    {
        alert("Ingrese un email valido");
        return;
    }
    
    var persona = new Persona(nombre, apellido, edad, email, sexo,LastInsertId()+1);
    console.log(persona);
    Create(persona);
    HideForm();
}

function UpdateEvent(e)
{
    e.preventDefault();
    console.log("modificar");
    var form = e.target.parentNode;
    var nombre = form.childNodes[1].value;
    var apellido = form.childNodes[3].value;
    var edad = form.childNodes[5].value;
    var email = form.childNodes[7].value;
    var sexo = "Female";
    if(form.childNodes[9].checked)
        sexo = "Male";
    
    if(nombre == "" || apellido == "" || email == "")
    {
        alert("Debe llenar todos los campos");
        return;
    }

    var id = form.getAttribute("id").split("_")[1];
    var persona = GetPersonaById(id);
    persona.first_name = nombre;
    persona.last_name = apellido;
    persona.edad = edad;
    persona.email = email;
    persona.gender = sexo;
    console.log(persona);
    Update(persona);
    HideForm();
}

function DeleteEvent(e)
{
    e.preventDefault();
    console.log("eliminar");
    var form = e.target.parentNode;    
    var id = form.getAttribute("id").split("_")[1];
    Delete(id);
    HideForm();
}

function CloseEvent(e)
{
    e.preventDefault();
    console.log("cerrar");
    var form = e.target.parentNode.parentNode;
    form.style.display = "none";
}