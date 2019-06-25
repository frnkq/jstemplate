/// <reference path="TableHelper.ts"/>
namespace Helpers
{
    export class FormHelper
    {
        static HideForm()
        {
            $("#divFrm").css("display", "none");
            $("#divFrm").html();
            Helpers.TableHelper.CreateTable(CRUD.PersonaCRUD.GetAll());
        }

        static ShowForm(persona?:Entidades.Persona)
        {
            $("#divFrm").html("");
            FormHelper.CreateForm(persona);
            
            $("#divFrm").css("display", "block");
        }

        static CreateForm(persona?:Entidades.Persona)
        { 
            console.log(persona);
            let form = $("#divFrm");
            let elements = [];

            let labelNombre = document.createElement("label");
            labelNombre.append(document.createTextNode("Nombre"));
            labelNombre.setAttribute("for", "txtNombre");
            labelNombre.setAttribute("id", "lblNombre");
            elements.push(labelNombre);

            let inputNombre = document.createElement("input");
            inputNombre.setAttribute("id", "txtNombre");
            inputNombre.setAttribute("type", "text");
            inputNombre.setAttribute("name", "txtNombre");
            elements.push(inputNombre);

            let labelApellido = document.createElement("label");
            labelApellido.append(document.createTextNode("Apellido"));
            labelApellido.setAttribute("for", "txtApellido");
            labelApellido.setAttribute("id", "lblApellido");
            elements.push(labelApellido);

            let inputApellido = document.createElement("input");
            inputApellido.setAttribute("id", "txtApellido");
            inputApellido.setAttribute("type", "text");
            inputApellido.setAttribute("name", "txtApellido");
            elements.push(inputApellido);

            
            let labelEmail = document.createElement("label");
            labelEmail.append(document.createTextNode("Email"));
            labelEmail.setAttribute("for", "txtEmail");
            labelEmail.setAttribute("id", "lblEmail");
            elements.push(labelEmail);

            let inputEmail = document.createElement("input");
            inputEmail.setAttribute("id", "txtEmail");
            inputEmail.setAttribute("type", "email");
            inputEmail.setAttribute("name", "txtEmail");
            elements.push(inputEmail);

            let labelEdad = document.createElement("label");
            labelEdad.append(document.createTextNode("Edad"));
            labelEdad.setAttribute("for", "nmbEdad");
            labelEdad.setAttribute("id", "lblEdad");
            elements.push(labelEdad);

            let inputEdad = document.createElement("input");
            inputEdad.setAttribute("id", "nmbEdad");
            inputEdad.setAttribute("type", "number");
            inputEdad.setAttribute("name", "nmbEdad");
            elements.push(inputEdad);

            let inputSexoM = document.createElement("input");
            inputSexoM.setAttribute("id", "radioSexoM");
            inputSexoM.setAttribute("type", "radio");
            inputSexoM.setAttribute("name", "gender");
            elements.push(inputSexoM);

            let labelSexoM = document.createElement("span");
            labelSexoM.append(document.createTextNode("Male"));
            elements.push(labelSexoM);


            let inputSexoF = document.createElement("input");
            inputSexoF.setAttribute("id", "radioSexoF");
            inputSexoF.setAttribute("type", "radio");
            inputSexoF.setAttribute("name", "gender");
            elements.push(inputSexoF);

            let labelSexoF = document.createElement("span");
            labelSexoF.append(document.createTextNode("Female"));
            elements.push(labelSexoF);

            let buttons = FormHelper.CrudButtons(persona as any);

            if(persona != null)
            {
                inputNombre.value = persona.nombre;
                inputApellido.value = persona.apellido;
                inputEdad.value = String(persona.edad);
                inputEmail.value = persona.email;
                if(persona.sexo == Entidades.Sexo.Male)
                {
                    inputSexoM.checked = true;
                    inputSexoF.checked = false;
                }
                else
                {
                    inputSexoM.checked = false;
                    inputSexoF.checked = true;
                }
            }

            elements.map(e=>{form.append(e); form.append(document.createElement("br"))});
            buttons.map(b=>{form.append(b)});
        }

        static CrudButtons(persona:Entidades.Persona):HTMLElement[]
        {
            let buttons = new Array<HTMLElement>();

            
            if(persona != null)
            {
                let editar = document.createElement("button");
                editar.setAttribute("id", "btnEditar");
                editar.setAttribute("class", "btn btn-warning col-12");
                editar.appendChild(document.createTextNode("Editar"));
                editar.addEventListener("click", function(e)
                {
                    e.preventDefault();
                    persona.nombre = $("#txtNombre").val() as any;
                    persona.edad = $("#nmbEdad").val() as any;
                    persona.apellido = $("#txtApellido").val() as any;
                    persona.email = $("#txtEmail").val() as any;
                    persona.sexo = ($("#radioSexoF")[0] as HTMLInputElement).checked ? Entidades.Sexo.Male : Entidades.Sexo.Female;
                    CRUD.PersonaCRUD.Update(persona);
                    FormHelper.HideForm();
                });
                buttons.push(editar);

                let eliminar = document.createElement("button");
                eliminar.setAttribute("id", "btnEliminar");
                eliminar.setAttribute("class", "btn btn-danger col-12");
                eliminar.appendChild(document.createTextNode("Eliminar"));
                eliminar.addEventListener("click", function(e)
                {
                    e.preventDefault();
                    CRUD.PersonaCRUD.Delete(persona.id);
                    FormHelper.HideForm();
                });
                buttons.push(eliminar);

            }
            else
            {
                let crear = document.createElement("button");
                crear.setAttribute("id", "btnAgregar");
                crear.setAttribute("class", "btn btn-success col-12");
                crear.appendChild(document.createTextNode("Crear"));
                crear.addEventListener("click", function(e)
                {
                    let sexo = ($("#radioSexoF")[0] as HTMLInputElement).checked ? Entidades.Sexo.Female : Entidades.Sexo.Male;

                    e.preventDefault();
                    let p = new Entidades.Persona(
                        CRUD.PersonaCRUD.LastInsertId()+1,
                        $("#txtNombre").val() as any,
                        $("#txtApellido").val() as any,
                        $("#nmbEdad").val() as any,
                        $("#txtEmail").val() as any,
                        sexo
                    );
                    console.log(p);
                    CRUD.PersonaCRUD.Create(p)
                    FormHelper.HideForm();
                });
                buttons.push(crear);
            }
            
            let cancel = document.createElement("button");
            cancel.setAttribute("id", "btnCancel");
            cancel.setAttribute("class", "btn btn-primary col-12");
            cancel.appendChild(document.createTextNode("Cancelar"));
            cancel.addEventListener("click", function(e)
            {
                e.preventDefault();
                FormHelper.HideForm();
            });
            buttons.push(cancel);

            return buttons;
        }
    }
}