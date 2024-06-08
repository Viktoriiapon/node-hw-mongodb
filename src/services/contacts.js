import createHttpError from 'http-errors';
import { Contact } from '../db/models/contact.js';

const createPaginationInformation=(page, perPage, count)=>{
  const totalPages = Math.ceil(count/perPage);
  const hasPreviousPage = page >1;
  const hasNextPage = page <totalPages;
return { 
  page,
perPage,
totalItems: count,
totalPages,
hasPreviousPage,
hasNextPage

}
}

export const getAllContacts = async ({page = 1, perPage = 5}) => {
  const skip = perPage * (page - 1);
  const contactsAmount =await Contacts.find().countDocuments();
  const paginationInformation = (page, perPage, contactsAmount);
  const contacts = await Contact.find().skip(skip).limit(perPage);

  return {
    contacts,
    ...paginationInformation
  }

};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);

  return contact;
};

//  export const updateContact = async (contactId, payload = {})=>{
//    const rawResult = await Contact.findByIdAndUpdate(contactId , payload, {
//       new: true,
//       includeResultMetadata: true,
//       });
//       if (!rawResult && rawResult.value ) {
//       throw createHttpError(404, 'Contact not found');

//     }

//    return {
//       contact: rawResult.value,
//       isNew: Boolean( rawResult.lastErrorObject.upserted),
//    };

//  }

export const updateContact = async (contactId, payload = {}) => {
  const contact = await Contact.findByIdAndUpdate(contactId, payload, {
    new: true,
  });

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  return { contact };
};

export const deleteContact = async (contactId) => {
  const contact = await Contact.findByIdAndDelete(contactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
};
