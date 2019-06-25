var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Sexo;
    (function (Sexo) {
        Sexo[Sexo["Male"] = 0] = "Male";
        Sexo[Sexo["Female"] = 1] = "Female";
        Sexo[Sexo["Both"] = 2] = "Both";
    })(Sexo = Entidades.Sexo || (Entidades.Sexo = {}));
    var Humano = /** @class */ (function () {
        function Humano(id, nombre, apellido) {
            this._id = id;
            this._nombre = nombre;
            this._apellido = apellido;
        }
        Object.defineProperty(Humano.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (id) {
                this._id = id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Humano.prototype, "nombre", {
            get: function () {
                return this._nombre;
            },
            set: function (nombre) {
                this._nombre = nombre;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Humano.prototype, "apellido", {
            get: function () {
                return this._apellido;
            },
            set: function (apellido) {
                this._apellido = apellido;
            },
            enumerable: true,
            configurable: true
        });
        return Humano;
    }());
    var Persona = /** @class */ (function (_super) {
        __extends(Persona, _super);
        function Persona(id, nombre, apellido, edad, email, sexo) {
            var _this = _super.call(this, id, nombre, apellido) || this;
            _this._edad = edad;
            _this._email = email;
            _this._sexo = sexo;
            return _this;
        }
        Object.defineProperty(Persona.prototype, "edad", {
            get: function () {
                return this._edad;
            },
            set: function (edad) {
                this._edad = edad;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Persona.prototype, "email", {
            get: function () {
                return this._email;
            },
            set: function (email) {
                this._email = email;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Persona.prototype, "sexo", {
            get: function () {
                return this._sexo;
            },
            set: function (sexo) {
                this._sexo = sexo;
            },
            enumerable: true,
            configurable: true
        });
        Persona.prototype.ToTableRow = function () {
            var tr = document.createElement("tr");
            tr.setAttribute("id", String(this.id));
            for (var key in this) {
                if (this.hasOwnProperty(key)) {
                    var td = document.createElement("td");
                    td.innerText = this[key];
                    if (key == "_sexo")
                        td.innerText = (this.sexo == Entidades.Sexo.Female) ? "Female" : "Male";
                    td.setAttribute("class", "td" + key);
                    td.addEventListener("click", Helpers.TableHelper.TdClick);
                    tr.append(td);
                }
            }
            return tr;
        };
        Persona.prototype.ToJson = function () {
            return {
                id: this.id,
                nombre: this.nombre,
                apellido: this.apellido,
                edad: this.edad,
                email: this.email,
                sexo: (this.sexo == Sexo.Male) ? "Male" : "Female"
            };
        };
        Persona.FromJson = function (object) {
            return new Persona(Number(object.id), object.nombre, object.apellido, Number(object.edad), object.email, (object.sexo == "Male") ? Sexo.Male : Sexo.Female);
        };
        return Persona;
    }(Humano));
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
///<reference path="../Entidades/Persona.ts"/>
var CRUD;
(function (CRUD) {
    var PersonaCRUD = /** @class */ (function () {
        function PersonaCRUD() {
        }
        PersonaCRUD.LastInsertId = function () {
            var personas = PersonaCRUD.GetAll();
            var ids = new Array();
            personas.map(function (p) {
                ids.push(p.id);
            });
            return ids.reduce(function (prev, curr) {
                return curr > prev ? curr : prev;
            }, 0);
        };
        PersonaCRUD.SaveArray = function (personas) {
            var arr = new Array();
            personas.map(function (p) {
                arr.push(p.ToJson());
            });
            localStorage.setItem("personas", JSON.stringify(arr));
        };
        PersonaCRUD.GetAll = function () {
            var arr = JSON.parse(localStorage.getItem("personas"));
            var personas = new Array();
            arr.map(function (obj) {
                personas.push(Entidades.Persona.FromJson(obj));
            });
            return personas;
        };
        PersonaCRUD.GetOne = function (id) {
            return PersonaCRUD.GetAll().filter(function (p) {
                return p.id == id;
            })[0];
        };
        PersonaCRUD.Create = function (p) {
            if (PersonaCRUD.GetOne(p.id) == null) {
                var personas = PersonaCRUD.GetAll();
                personas.push(p);
                PersonaCRUD.SaveArray(personas);
            }
        };
        PersonaCRUD.Update = function (persona) {
            if (PersonaCRUD.GetOne(persona.id)) {
                var personas = PersonaCRUD.GetAll();
                var ind_1 = -1;
                personas.forEach(function (p, index) {
                    if (persona.id == p.id) {
                        ind_1 = index;
                    }
                });
                personas[ind_1] = persona;
                PersonaCRUD.SaveArray(personas);
            }
        };
        PersonaCRUD.Delete = function (id) {
            if (PersonaCRUD.GetOne(id)) {
                var personas = PersonaCRUD.GetAll();
                var ind_2 = -1;
                personas.forEach(function (p, index) {
                    if (id == p.id) {
                        ind_2 = index;
                    }
                });
                personas.splice(ind_2, 1);
                PersonaCRUD.SaveArray(personas);
            }
        };
        return PersonaCRUD;
    }());
    CRUD.PersonaCRUD = PersonaCRUD;
})(CRUD || (CRUD = {}));
/// <reference path="../Entidades/Persona.ts"/>
var Helpers;
(function (Helpers) {
    var TableHelper = /** @class */ (function () {
        function TableHelper() {
        }
        TableHelper.CreateFilters = function () {
            var selectSexo = document.createElement("select");
            var optionSexoF = document.createElement("option");
            optionSexoF.setAttribute("value", "Female");
            optionSexoF.append(document.createTextNode("Female"));
            var optionSexoM = document.createElement("option");
            optionSexoM.setAttribute("value", "Male");
            optionSexoM.append(document.createTextNode("Male"));
            var optionSexoB = document.createElement("option");
            optionSexoB.setAttribute("value", "Both");
            optionSexoB.append(document.createTextNode("Both"));
            selectSexo.append(optionSexoB);
            selectSexo.append(optionSexoF);
            selectSexo.append(optionSexoM);
            selectSexo.addEventListener("change", function (e) {
                Helpers.TableHelper.CreateTable(CRUD.PersonaCRUD.GetAll().filter(function (p) {
                    if (optionSexoF.selected)
                        return p.sexo == Entidades.Sexo.Female;
                    if (optionSexoM.selected)
                        return p.sexo == Entidades.Sexo.Male;
                    if (optionSexoB.selected)
                        return true;
                }));
            });
            $("#filters").append(selectSexo);
        };
        TableHelper.FilterTable = function () {
            //can't get checks, are null, documentready??
            var keys = ["_id", "_nombre", "_apellido", "_edad", "_email", "_sexo"];
            for (var k in keys) {
                if ($("#check" + k).checked) {
                    $(".td" + k).css("display", "table-cell");
                }
                else {
                    $(".td" + k).css("display", "none");
                }
            }
        };
        TableHelper.GetData = function () {
            $("#datos").html("");
            var personas = TableHelper.GetPersonasFromTable();
            var mayor = personas.reduce(function (prev, curr) {
                return curr.edad > prev.edad ? curr : prev;
            });
            var edades = new Array();
            personas.map(function (p) { edades.push(p.edad); });
            var avg = edades.reduce(function (prev, curr) {
                return prev + curr;
            }, 0) / edades.length;
            $("#datos").append("<p>mayor: " + mayor.nombre + "</p><p>Promedio: " + avg + "</p>");
        };
        TableHelper.GetPersonasFromTable = function () {
            var personas = new Array();
            //console.log($("#bodyTabla").children());
            var trs = $("#bodyTabla").children();
            for (var i = 0; i < trs.length; i++) {
                var persona = CRUD.PersonaCRUD.GetOne(Number(trs[i].getAttribute("id")));
                personas.push(persona);
            }
            return personas;
        };
        TableHelper.CreateColumnSelector = function () {
            var p = new Entidades.Persona(-1, "", "", -1, "", Entidades.Sexo.Male);
            var _loop_1 = function (key) {
                if (p.hasOwnProperty(key)) {
                    var check_1 = document.createElement("input");
                    check_1.setAttribute("type", "checkbox");
                    check_1.setAttribute("id", "check" + key);
                    check_1.checked = true;
                    check_1.addEventListener("change", function (e) {
                        if (check_1.checked)
                            $(".td" + key).css("display", "table-cell");
                        else
                            $(".td" + key).css("display", "none");
                    });
                    $("#columns").append(check_1);
                    $("#columns").append(document.createTextNode(key.toUpperCase()));
                }
            };
            for (var key in p) {
                _loop_1(key);
            }
        };
        TableHelper.CreateTable = function (personas) {
            $("#bodyTabla").html("");
            personas.map(function (p) {
                $("#bodyTabla").append(p.ToTableRow());
            });
            TableHelper.FilterTable();
            TableHelper.GetData();
        };
        TableHelper.TdClick = function (e) {
            var id = e.target.parentNode.getAttribute("id");
            console.log("click");
            var persona = CRUD.PersonaCRUD.GetOne(Number(id));
            Helpers.FormHelper.ShowForm(persona);
        };
        return TableHelper;
    }());
    Helpers.TableHelper = TableHelper;
})(Helpers || (Helpers = {}));
/// <reference path="TableHelper.ts"/>
var Helpers;
(function (Helpers) {
    var FormHelper = /** @class */ (function () {
        function FormHelper() {
        }
        FormHelper.HideForm = function () {
            $("#divFrm").css("display", "none");
            $("#divFrm").html();
            Helpers.TableHelper.CreateTable(CRUD.PersonaCRUD.GetAll());
        };
        FormHelper.ShowForm = function (persona) {
            $("#divFrm").html("");
            FormHelper.CreateForm(persona);
            $("#divFrm").css("display", "block");
        };
        FormHelper.CreateForm = function (persona) {
            console.log(persona);
            var form = $("#divFrm");
            var elements = [];
            var labelNombre = document.createElement("label");
            labelNombre.append(document.createTextNode("Nombre"));
            labelNombre.setAttribute("for", "txtNombre");
            labelNombre.setAttribute("id", "lblNombre");
            elements.push(labelNombre);
            var inputNombre = document.createElement("input");
            inputNombre.setAttribute("id", "txtNombre");
            inputNombre.setAttribute("type", "text");
            inputNombre.setAttribute("name", "txtNombre");
            elements.push(inputNombre);
            var labelApellido = document.createElement("label");
            labelApellido.append(document.createTextNode("Apellido"));
            labelApellido.setAttribute("for", "txtApellido");
            labelApellido.setAttribute("id", "lblApellido");
            elements.push(labelApellido);
            var inputApellido = document.createElement("input");
            inputApellido.setAttribute("id", "txtApellido");
            inputApellido.setAttribute("type", "text");
            inputApellido.setAttribute("name", "txtApellido");
            elements.push(inputApellido);
            var labelEmail = document.createElement("label");
            labelEmail.append(document.createTextNode("Email"));
            labelEmail.setAttribute("for", "txtEmail");
            labelEmail.setAttribute("id", "lblEmail");
            elements.push(labelEmail);
            var inputEmail = document.createElement("input");
            inputEmail.setAttribute("id", "txtEmail");
            inputEmail.setAttribute("type", "email");
            inputEmail.setAttribute("name", "txtEmail");
            elements.push(inputEmail);
            var labelEdad = document.createElement("label");
            labelEdad.append(document.createTextNode("Edad"));
            labelEdad.setAttribute("for", "nmbEdad");
            labelEdad.setAttribute("id", "lblEdad");
            elements.push(labelEdad);
            var inputEdad = document.createElement("input");
            inputEdad.setAttribute("id", "nmbEdad");
            inputEdad.setAttribute("type", "number");
            inputEdad.setAttribute("name", "nmbEdad");
            elements.push(inputEdad);
            var inputSexoM = document.createElement("input");
            inputSexoM.setAttribute("id", "radioSexoM");
            inputSexoM.setAttribute("type", "radio");
            inputSexoM.setAttribute("name", "gender");
            elements.push(inputSexoM);
            var labelSexoM = document.createElement("span");
            labelSexoM.append(document.createTextNode("Male"));
            elements.push(labelSexoM);
            var inputSexoF = document.createElement("input");
            inputSexoF.setAttribute("id", "radioSexoF");
            inputSexoF.setAttribute("type", "radio");
            inputSexoF.setAttribute("name", "gender");
            elements.push(inputSexoF);
            var labelSexoF = document.createElement("span");
            labelSexoF.append(document.createTextNode("Female"));
            elements.push(labelSexoF);
            var buttons = FormHelper.CrudButtons(persona);
            if (persona != null) {
                inputNombre.value = persona.nombre;
                inputApellido.value = persona.apellido;
                inputEdad.value = String(persona.edad);
                inputEmail.value = persona.email;
                if (persona.sexo == Entidades.Sexo.Male) {
                    inputSexoM.checked = true;
                    inputSexoF.checked = false;
                }
                else {
                    inputSexoM.checked = false;
                    inputSexoF.checked = true;
                }
            }
            elements.map(function (e) { form.append(e); form.append(document.createElement("br")); });
            buttons.map(function (b) { form.append(b); });
        };
        FormHelper.CrudButtons = function (persona) {
            var buttons = new Array();
            if (persona != null) {
                var editar = document.createElement("button");
                editar.setAttribute("id", "btnEditar");
                editar.setAttribute("class", "btn btn-warning col-12");
                editar.appendChild(document.createTextNode("Editar"));
                editar.addEventListener("click", function (e) {
                    e.preventDefault();
                    persona.nombre = $("#txtNombre").val();
                    persona.edad = $("#nmbEdad").val();
                    persona.apellido = $("#txtApellido").val();
                    persona.email = $("#txtEmail").val();
                    persona.sexo = $("#radioSexoF")[0].checked ? Entidades.Sexo.Male : Entidades.Sexo.Female;
                    CRUD.PersonaCRUD.Update(persona);
                    FormHelper.HideForm();
                });
                buttons.push(editar);
                var eliminar = document.createElement("button");
                eliminar.setAttribute("id", "btnEliminar");
                eliminar.setAttribute("class", "btn btn-danger col-12");
                eliminar.appendChild(document.createTextNode("Eliminar"));
                eliminar.addEventListener("click", function (e) {
                    e.preventDefault();
                    CRUD.PersonaCRUD.Delete(persona.id);
                    FormHelper.HideForm();
                });
                buttons.push(eliminar);
            }
            else {
                var crear = document.createElement("button");
                crear.setAttribute("id", "btnAgregar");
                crear.setAttribute("class", "btn btn-success col-12");
                crear.appendChild(document.createTextNode("Crear"));
                crear.addEventListener("click", function (e) {
                    var sexo = $("#radioSexoF")[0].checked ? Entidades.Sexo.Female : Entidades.Sexo.Male;
                    e.preventDefault();
                    var p = new Entidades.Persona(CRUD.PersonaCRUD.LastInsertId() + 1, $("#txtNombre").val(), $("#txtApellido").val(), $("#nmbEdad").val(), $("#txtEmail").val(), sexo);
                    console.log(p);
                    CRUD.PersonaCRUD.Create(p);
                    FormHelper.HideForm();
                });
                buttons.push(crear);
            }
            var cancel = document.createElement("button");
            cancel.setAttribute("id", "btnCancel");
            cancel.setAttribute("class", "btn btn-primary col-12");
            cancel.appendChild(document.createTextNode("Cancelar"));
            cancel.addEventListener("click", function (e) {
                e.preventDefault();
                FormHelper.HideForm();
            });
            buttons.push(cancel);
            return buttons;
        };
        return FormHelper;
    }());
    Helpers.FormHelper = FormHelper;
})(Helpers || (Helpers = {}));
var data = [{
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
$(document).ready(function () {
    //localStorage.setItem("personas", JSON.stringify(data));
    Helpers.TableHelper.CreateTable(CRUD.PersonaCRUD.GetAll());
    Helpers.TableHelper.CreateFilters();
    Helpers.TableHelper.CreateColumnSelector();
    document.getElementById("btnAlta").addEventListener("click", Helpers.FormHelper.ShowForm.bind(null, null));
});
