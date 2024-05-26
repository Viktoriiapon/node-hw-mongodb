// name - string, required
// phoneNumber - string, required
// email - email, optional
// isFavourite - boolean, default false
// contactType - string, enum(’work’, ‘home’, ‘personal’), required, default ‘personal’
// createdAt - дата створення
// updatedAt - дата оновлення

import { Schema, model } from "mongoose";

const contactSchema = new Schema({
    name:{ type: String, required: true},
    phoneNumber: { type: String, required: true},
    email: { type: String , required: true},
    isFavourite: {type: Boolean, default: false},
    contactType: { type: String, enum :['work', 'home', 'personal'], required: true, default: 'personal'},
},{ timestamps: true, versionKey: false});

export const Contacts = model('contacts', contactSchema)
