//definimos  una interface ya que solo vamos a definir propiedades
/**pokemon.model.ts: al ser modelo asegura que los datos sena correctos */
import { IStat } from "./stat.model";

export interface IPokemon {
    hiddenAbility: any;
    id:number;
    name:string;
    type1:string;
    //?: indica que es opcional(puede no existir)
    type2?:string;
    sprite:string;
    height:number;
    weight:number;
    abilities:string[];
    hidenAbility?:string;
    stats:IStat[];
    description?:string; // NUEVO
    

    

}