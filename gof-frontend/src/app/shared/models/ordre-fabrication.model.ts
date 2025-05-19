import { Produit } from './produit.model';

export type EtatOrdre = 'EN_ATTENTE' | 'EN_PRODUCTION' | 'DECLARE';

export interface OrdreFabrication {
  id?: number;
  projet: string;
  produit: Produit;
  quantite: number;
  date: string; // format YYYY-MM-DD
  etat?: EtatOrdre;
}
