/// <reference path="../Entidades/Persona.ts"/>
namespace Helpers
{
    export class TableHelper
    {
        static CreateSearch()
        {
            let searchInput = document.createElement("input");
            searchInput.setAttribute("type", "text");
            searchInput.setAttribute("id", "searchInput");
            searchInput.setAttribute("placeholder", "Buscar");

            let searchButton = document.createElement("button");
            searchButton.append(document.createTextNode("Buscar"));
            searchButton.setAttribute("class", "btn btn-success");
            searchButton.addEventListener("click", function(e)
            {
                e.preventDefault();
                let personas = CRUD.PersonaCRUD.Buscar(searchInput.value);
                if(personas.length > 0)
                {
                    
                    TableHelper.CreateTable(personas);
                }
                else
                {
                    alert("No se encontro la persona");
                }
            });
            $("#search").append(searchInput);
            $("#search").append(searchButton);
        }
        static CreateFilters()
        {
            let selectSexo = document.createElement("select");
            
            let optionSexoF = document.createElement("option");
            optionSexoF.setAttribute("value", "Female");
            optionSexoF.append(document.createTextNode("Female"));

            let optionSexoM = document.createElement("option");
            optionSexoM.setAttribute("value", "Male");
            optionSexoM.append(document.createTextNode("Male"));

            let optionSexoB = document.createElement("option");
            optionSexoB.setAttribute("value", "Both");
            optionSexoB.append(document.createTextNode("Both"));

            selectSexo.append(optionSexoB);
            selectSexo.append(optionSexoF);
            selectSexo.append(optionSexoM);
            selectSexo.addEventListener("change", function(e)
            {
                Helpers.TableHelper.CreateTable(CRUD.PersonaCRUD.GetAll().filter(function(p)
                {
                    if(optionSexoF.selected)
                        return p.sexo == Entidades.Sexo.Female;
                    
                    if(optionSexoM.selected)
                        return p.sexo == Entidades.Sexo.Male;
                   
                        if(optionSexoB.selected)
                        return true;
                }));
            })
            $("#filters").append(selectSexo);
        }

        static FilterTable()
        {
            //can't get checks, are null, documentready??
            let keys = ["_id", "_nombre","_apellido","_edad","_email","_sexo"];
            for(let k in keys)
            {
                if( ($("#check"+k) as any).checked )
                {
                    $(".td"+k).css("display", "table-cell");
                }
                else
                {
                    $(".td"+k).css("display", "none");
                }
            }
        }

        static GetData()
        {
            $("#datos").html("");
            let personas = TableHelper.GetPersonasFromTable();
            
            let mayor = personas.reduce(function(prev,curr)
            {
                return curr.edad > prev.edad ? curr : prev;
            });

            let edades = new Array<number>();
            personas.map(p=>{edades.push(p.edad)});
            
            let avg = edades.reduce(function(prev,curr)
            {
                return prev+curr;
            },0) / edades.length;

            $("#datos").append("<p>mayor: "+mayor.nombre+"</p><p>Promedio: "+avg+"</p>");
        }
    
        static GetPersonasFromTable():Entidades.Persona[]
        {
            let personas = new Array<Entidades.Persona>();
            //console.log($("#bodyTabla").children());
            let trs = $("#bodyTabla").children();
            for(let i=0;i<trs.length;i++)
            {
                let persona = CRUD.PersonaCRUD.GetOne(Number(trs[i].getAttribute("id")));
                personas.push(persona);
            }
            return personas;
        }
        
        static CreateColumnSelector()
        {
            let p = new Entidades.Persona(-1,"","",-1,"",Entidades.Sexo.Male);
            for(let key in p)
            {
                if(p.hasOwnProperty(key))
                {
                    let check = document.createElement("input");
                    check.setAttribute("type", "checkbox");
                    check.setAttribute("id", "check"+key);
                    check.checked = true;
                    check.addEventListener("change", function(e)
                    {
                        if(check.checked)
                            $(".td"+key).css("display", "table-cell");
                        else
                            $(".td"+key).css("display", "none");
                    });
                    $("#columns").append(check);
                    $("#columns").append(document.createTextNode(key.toUpperCase()));
                }
              
            }
            
        }

        static CreateTable(personas:Entidades.Persona[])
        {
            $("#bodyTabla").html("");
            personas.map(p=>{
                $("#bodyTabla").append(p.ToTableRow());
            }); 
            TableHelper.FilterTable();
            TableHelper.GetData();
        }

        static SortBy(field:string)
        {
            switch(field)
            {
                case "id":
                TableHelper.CreateTable(
                    TableHelper.GetPersonasFromTable().sort(function(a,b)
                    {
                        return a.id > b.id ? 1 : -1;
                    })
                );
                break;

                case "nombre":
                TableHelper.CreateTable(
                    TableHelper.GetPersonasFromTable().sort(function(a,b)
                    {
                        return a.nombre > b.nombre ? 1 : -1;
                    })
                );
                break;

                case "apellido":
                TableHelper.CreateTable(
                    TableHelper.GetPersonasFromTable().sort(function(a,b)
                    {
                        return a.apellido > b.apellido ? 1 : -1;
                    })
                );
                break;

                case "edad":
                TableHelper.CreateTable(
                    TableHelper.GetPersonasFromTable().sort(function(a,b)
                    {
                        return a.edad > b.edad ? 1 : -1;
                    })
                );
                break;

                case "email":
                TableHelper.CreateTable(
                    TableHelper.GetPersonasFromTable().sort(function(a,b)
                    {
                        return a.email > b.email ? 1 : -1;
                    })
                );
                break;

                case "gender":
                TableHelper.CreateTable(
                    TableHelper.GetPersonasFromTable().sort(function(a,b)
                    {
                        return a.sexo > b.sexo ? 1 : -1;
                    })
                );
                break;
            }
        }

        static TdClick(e:any)
        {
            let id = e.target.parentNode.getAttribute("id");
            console.log("click");
            let persona = CRUD.PersonaCRUD.GetOne(Number(id));
            Helpers.FormHelper.ShowForm(persona);
        }
    }
}