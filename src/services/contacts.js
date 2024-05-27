import { Contact } from "../db/models/contact.js"

export const getAllContacts = async () => {
   return await Contact.find();
};

export const getContactById = async (_id) => {
    return await Contact.findById(_id);
  };