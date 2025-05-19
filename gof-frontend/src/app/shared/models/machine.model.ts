import {EtatMachine} from "./etatMachine.model";

export interface Machine {
  id: number;
  nom: string;
  etat: EtatMachine;
  derniereMaintenance: string;
}
