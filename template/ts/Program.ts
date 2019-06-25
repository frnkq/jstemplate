let data = [{
    "id": 1,
    "nombre": "Cleopatra",
    "apellido": "Farries",
    "email": "cfarries0@cnet.com",
    "sexo": "Female",
    "edad": 51
  }, {
    "id": 2,
    "nombre": "Belle",
    "apellido": "Shier",
    "email": "bshier1@webnode.com",
    "sexo": "Female",
    "edad": 25
  }, {
    "id": 3,
    "nombre": "Emlyn",
    "apellido": "Tomkys",
    "email": "etomkys2@pen.io",
    "sexo": "Male",
    "edad": 72
  }, {
    "id": 4,
    "nombre": "Marion",
    "apellido": "Broughton",
    "email": "mbroughton3@github.com",
    "sexo": "Male",
    "edad": 45
  }, {
    "id": 5,
    "nombre": "Debbi",
    "apellido": "Gollin",
    "email": "dgollin4@typepad.com",
    "sexo": "Female",
    "edad": 11
  }, {
    "id": 6,
    "nombre": "Bryon",
    "apellido": "Ogbourne",
    "email": "bogbourne5@npr.org",
    "sexo": "Male",
    "edad": 59
  }, {
    "id": 7,
    "nombre": "Leola",
    "apellido": "Dowers",
    "email": "ldowers6@lycos.com",
    "sexo": "Female",
    "edad": 38
  }, {
    "id": 8,
    "nombre": "Saudra",
    "apellido": "Houseley",
    "email": "shouseley7@51.la",
    "sexo": "Female",
    "edad": 19
  }, {
    "id": 9,
    "nombre": "Kippy",
    "apellido": "Seagrave",
    "email": "kseagrave8@mediafire.com",
    "sexo": "Female",
    "edad": 70
  }, {
    "id": 10,
    "nombre": "Ginny",
    "apellido": "Trussman",
    "email": "gtrussman9@disqus.com",
    "sexo": "Female",
    "edad": 24
  }, {
    "id": 11,
    "nombre": "Persis",
    "apellido": "Cordeix",
    "email": "pcordeixa@123-reg.co.uk",
    "sexo": "Female",
    "edad": 43
  }, {
    "id": 12,
    "nombre": "Gregor",
    "apellido": "Anglin",
    "email": "ganglinb@a8.net",
    "sexo": "Male",
    "edad": 52
  }, {
    "id": 13,
    "nombre": "Eleonora",
    "apellido": "Coleford",
    "email": "ecolefordc@foxnews.com",
    "sexo": "Female",
    "edad": 90
  }, {
    "id": 14,
    "nombre": "Eleonore",
    "apellido": "Espadas",
    "email": "eespadasd@google.ru",
    "sexo": "Female",
    "edad": 66
  }, {
    "id": 15,
    "nombre": "Prentice",
    "apellido": "Gerriet",
    "email": "pgerriete@nbcnews.com",
    "sexo": "Male",
    "edad": 9
  }];

///<reference path="TableHelper.ts"/>
///<reference path="PersonaCRUD.ts"/>
$(document).ready(function()
{
    //localStorage.setItem("personas", JSON.stringify(data));
    Helpers.TableHelper.CreateTable(CRUD.PersonaCRUD.GetAll());
    Helpers.TableHelper.CreateFilters();
    Helpers.TableHelper.CreateColumnSelector();
    
    (document.getElementById("btnAlta") as any).addEventListener("click", Helpers.FormHelper.ShowForm.bind(null, null));
    (document.getElementById("head_id") as HTMLElement).addEventListener("click", function()
            {
                console.log("sorting by id");
                Helpers.TableHelper.SortBy("id")
            });

            (document.getElementById("head_nombre") as HTMLElement).addEventListener("click", function()
            {
                console.log("sorting by name");
                Helpers.TableHelper.SortBy("nombre")
            });

            (document.getElementById("head_apellido") as HTMLElement).addEventListener("click", function()
            {
                console.log("sorting by apellido");
                Helpers.TableHelper.SortBy("apellido")
            });

            (document.getElementById("head_edad") as HTMLElement).addEventListener("click", function()
            {
                console.log("sorting by edad");
                Helpers.TableHelper.SortBy("edad")
            });

            (document.getElementById("head_email") as HTMLElement).addEventListener("click", function()
            {
                console.log("sorting by email");
                Helpers.TableHelper.SortBy("email")
            });

            (document.getElementById("head_gender") as HTMLElement).addEventListener("click", function()
            {
                console.log("sorting by gender");
                Helpers.TableHelper.SortBy("gender")
            });
});