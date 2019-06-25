namespace Entidades
{
    export enum Sexo 
    {
        Male,
        Female,
        Both
    }
    class Humano
    {
        private _id:number;
        private _nombre:string;
        private _apellido:string;
        public get id():number
        {
            return this._id;
        }

        public set id(id:number)
        {
            this._id = id;
        }
        public get nombre():string
        {
            return this._nombre;
        }
        public set nombre(nombre:string)
        {
            this._nombre = nombre;
        }
        public get apellido():string
        {
            return this._apellido;
        }
        public set apellido(apellido:string)
        {
            this._apellido = apellido;
        }
        public constructor(id:number, nombre:string, apellido:string)
        {
            this._id = id;
            this._nombre = nombre;
            this._apellido = apellido;
        }
    }

    export interface IPersona
    {
        id:string;
        nombre:string;
        apellido:string;
        edad:string;
        email:string;
        sexo:string;
    }

    export class Persona extends Humano
    {
     //edad email sexo
        private _edad:number;
        private _email:string;
        private _sexo:Sexo;
        public get edad():number
        {
            return this._edad;
        }
        public set edad(edad:number)
        {
            this._edad = edad;
        }
        public get email():string
        {
            return this._email;
        }
        public set email(email:string)
        {
            this._email = email;
        }
        public get sexo():Sexo
        {
            return this._sexo;
        }
        public set sexo(sexo:Sexo)
        {
            this._sexo = sexo;
        }
        public constructor(id:number, nombre:string, apellido:string, edad:number, email:string, sexo:Sexo)
        {
            super(id, nombre, apellido);
            this._edad = edad;
            this._email = email;
            this._sexo = sexo;
        }

        ToTableRow():HTMLElement
        {
            let tr = document.createElement("tr");
            tr.setAttribute("id", String(this.id));
            
            for(let key in this)
            {
                if(this.hasOwnProperty(key))
                {

                    let td = document.createElement("td");
                    td.innerText = this[key] as any;
                    if(key == "_sexo")
                        td.innerText = (this.sexo == Entidades.Sexo.Female) ? "Female" : "Male";
                    
                    td.setAttribute("class", "td"+key);
                    td.addEventListener("click", Helpers.TableHelper.TdClick);
                    tr.append(td);
                }
            }
            return tr;
        }

        ToJson()
        {
            return {
                id:this.id,
                nombre:this.nombre,
                apellido:this.apellido,
                edad:this.edad,
                email:this.email,
                sexo: (this.sexo == Sexo.Male) ? "Male" : "Female"
            };
        }

        static FromJson(object:IPersona):Persona
        {
            return new Persona(
                Number(object.id),
                object.nombre,
                object.apellido,
                Number(object.edad),
                object.email,
                (object.sexo == "Male") ? Sexo.Male : Sexo.Female
            );
        }
    }
}