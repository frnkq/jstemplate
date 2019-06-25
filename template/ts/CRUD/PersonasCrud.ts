///<reference path="../Entidades/Persona.ts"/>
namespace CRUD 
{
    export class PersonaCRUD
    {
        static LastInsertId()
        {
            let personas = PersonaCRUD.GetAll();
            let ids = new Array<number>()
            personas.map(p=>{
                ids.push(p.id);
            });
            
            return ids.reduce(function(prev,curr)
            {
                return curr > prev ? curr : prev;
            },0);
        }
        static SaveArray(personas:Entidades.Persona[])
        {
            let arr = new Array<any>();
            personas.map(p=>{
                arr.push(p.ToJson());
            })
            localStorage.setItem("personas", JSON.stringify(arr));
        }

        static GetAll():Entidades.Persona[]
        {
            let arr = JSON.parse(localStorage.getItem("personas") as string) as Entidades.IPersona[];
            let personas = new Array<Entidades.Persona>();
            arr.map(obj=>{
                personas.push(Entidades.Persona.FromJson(obj));
            });
            return personas;
        }

        static GetOne(id:number):Entidades.Persona
        {
            return PersonaCRUD.GetAll().filter(function(p)
            {
                return p.id == id;
            })[0];
        }

        static Create(p:Entidades.Persona)
        {
            if(PersonaCRUD.GetOne(p.id) == null)
            {
                let personas = PersonaCRUD.GetAll();
                personas.push(p);
                PersonaCRUD.SaveArray(personas);
            }
        }

        static Update(persona:Entidades.Persona)
        {
            if(PersonaCRUD.GetOne(persona.id))
            {
                let personas = PersonaCRUD.GetAll();
                let ind = -1;
                personas.forEach(function(p, index)
                {
                    if(persona.id == p.id)
                    {
                        ind = index;
                    }
                });
                personas[ind] = persona;
                PersonaCRUD.SaveArray(personas);
            }
        }

        static Delete(id:number)
        {
            if(PersonaCRUD.GetOne(id))
            {
                let personas = PersonaCRUD.GetAll();
                let ind = -1;
                personas.forEach(function(p, index)
                {
                    if(id == p.id)
                    {
                        ind = index;
                    }
                });
                personas.splice(ind, 1);
                PersonaCRUD.SaveArray(personas);
            }
        }

        static Buscar(query:string):Entidades.Persona[]
        {
            let personas = PersonaCRUD.GetAll();
            let retorno = new Array<Entidades.Persona>();
            for(let p of personas)
            {
                if(String(p.id) == query)
                {
                    retorno.push(p);
                }
                if(p.nombre.indexOf(query) >= 0)
                {
                    retorno.push(p);
                }

                if(p.apellido.indexOf(query) >= 0)
                {
                    retorno.push(p);
                }

                if(p.email.indexOf(query) >= 0)
                {
                    retorno.push(p);
                }
            }
            return retorno;
        }
    }
    
}