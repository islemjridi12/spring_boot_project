import {Machine} from "./machine.model";

export interface Employe {
  id: number;
  nom: string;
  poste: string;
  machineAssigneeId?: number | null;   // pour envoi PUT/POST
  machineAssignee?: Machine | null;    // pour affichage
}
