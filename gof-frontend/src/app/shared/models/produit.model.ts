import { LigneMatPrem } from './ligne-matprem.model';

export interface Produit {
  id?: number;
  nom: string;
  type: string;
  stock: number;
  fournisseur: string;
  matieresPremieres?: LigneMatPrem[];
}
