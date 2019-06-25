function GetData()
{
    var trs = $("#bodyTabla").children();
    let personas = [];
    for(var i=0;i<trs.length;i++)
    {
        personas.push(PersonaFromTableRow(trs[i]));
    }
    let mayor = personas.reduce(function(prev,curr)
    {
        return curr.edad > prev.edad ? curr : prev;
    });

    let ages = [];
    personas.map(p=>{ages.push(p.edad)});
    let sum = ages.reduce(function(prev,curr)
    {
        return Number(prev)+Number(curr);
    });
    let avg = sum / ages.length;

    $("#datos").html("<p>Mayor;"+mayor.first_name+"</p><p>Avg edad;"+avg+"</p>");
}

function CreateFilters()
{
    let fields = ["first_name", "last_name", "edad", "email", "gender", "id"];
    let filters = $("#filters");

    fields.map(function(f)
    { 
        let div = document.createElement("div");
        div.setAttribute("class", "col-12 text-center col-md text-md-left");
        let chck = document.createElement("input");
        chck.setAttribute("type", "checkbox");
        chck.setAttribute("id", "check"+f);
        chck.setAttribute("checked", true);
        chck.addEventListener("change", function(e){
            if(chck.checked)
                $(".td"+f).css("display","table-cell");
            else
            {
                $(".td"+f).css("display","none");
            }
                
        });
        div.append(chck);
        div.append(document.createTextNode(f));
        filters.append(div);
        
    });

    let select = document.createElement("select");
    
    let optionB = document.createElement("option");
    optionB.setAttribute("name", "gender");
    optionB.setAttribute("value", "Both");
    optionB.appendChild(document.createTextNode("Both"));
    select.append(optionB);

    let optionM = document.createElement("option");
    optionM.setAttribute("name", "gender");
    optionM.setAttribute("value", "Male");
    optionM.appendChild(document.createTextNode("Male"));
    select.append(optionM);


    let optionF = document.createElement("option");
    optionF.setAttribute("name", "gender");
    optionF.setAttribute("value", "Female");
    optionF.appendChild(document.createTextNode("Female"));
    select.append(optionF);

    select.addEventListener("change", function(e)
    {
        CrearTabla(GetAll().filter(function(p)
        {
            if(optionF.selected)
            {
                return p.gender == "Female";
            }
            if(optionM.selected)
            {
                return p.gender == "Male";
            }
            if(optionB.selected)
            {
                return true;
            }
        }));
        
    });
    filters.append(select);

    return filters;
}

function FilterTable()
{

    

    let fields = ["first_name", "last_name","edad", "email", "gender", "id"];
    fields.map(function(f)
    {
        if($("#check"+f).checked)
            $(".td"+f).css("display","table-cell");
        else
            $(".td"+f).css("display","none");
    });

}

function CleanTable()
{
    let tbodyDiv = document.getElementById("bodyTabla");
    tbodyDiv.innerHTML = "";
    tbodyDiv.innerText = "";
}

function CrearTabla(personas)
{
    CleanTable();
    let tbodyDiv = document.getElementById("bodyTabla");
    let fields = GetFields(personas);

   personas.map(function(p)
   {
        tbodyDiv.appendChild(PersonaToTableRow(p));
   });

   GetData();
}

function TdClick(e)
{
    let id = e.target.parentNode.getAttribute("id").split("_")[1];
    persona = GetPersonaById(id);
    ShowForm(persona);
}

function GetPersonaById(id)
{
    return GetOne(id);
    /*
    for(let i=0;i<personas.length;i++)
    {
        if(personas[i]["id"]==id)
            return personas[i];
    }
    return null;
    */
}