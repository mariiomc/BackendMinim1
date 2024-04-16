import { IUser } from 'modules/users/model';
import * as mongoose from 'mongoose';

export interface IEvent {

    //Cada vez que hay un login, se crea un user o se edita un 
    //User, se crea un evento

    //Login --> Date ultimoLogin (ultimo login realizado por un usuario)
    //Creación user --> User user (último usuario creado)
    //Edicion User --> Un string con el nombre ddel usuario editado

    
    _id?: mongoose.Types.ObjectId; // Optional _id field
    ultimoLogin?: Date;
    User?: string;    
    edicionUser?: string;
    event_deactivated: boolean;
}