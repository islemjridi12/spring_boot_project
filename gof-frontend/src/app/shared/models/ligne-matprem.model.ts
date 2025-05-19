import {Produit} from "./produit.model";


export interface LigneMatPrem {
  id?: number;
  qte: number;
  produit: Produit;       // matière première
}
