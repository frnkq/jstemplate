let btnAlta;
let divFrm;
let frmAlta;
let divInfo;
let btnCancelar;

let lista;
let personas;
let filters  = null;
$(document).ready(function()
{
    btnAlta = document.getElementById('btnAlta');

    btnAlta.onclick = function () {
        ShowForm();
    }
   TraerPersonas();
   if(filters == null)
    filters = CreateFilters();
});


function TraerPersonas()
{
    let personasTabla = document.getElementById("bodyTabla");
    personasTabla.innerText = "";
    personasTabla.innerHTML = "";
    var personas = GetAll();
    CrearTabla(personas);
}

