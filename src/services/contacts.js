import createHttpError from 'http-errors';
import { Contact } from '../db/models/contact.js';
import { SORT_ORDER } from '../constants/index.js';
import { saveFileToLocal } from '../utils/safeFileToLocal.js';

const createPaginationInformation = (page, perPage, count) => {
  const totalPages = Math.ceil(count / perPage);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;
  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

export const getAllContacts = async ({
  page = 1,
  perPage = 5,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'name',
  filter = {},
}) => {
  const skip = perPage * (page - 1);

  const contactsQuery = Contact.find();

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsAmount, contacts] = await Promise.all([
    Contact.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  const paginationInformation = createPaginationInformation(
    page,
    perPage,
    contactsAmount,
  );

  return {
    data: contacts,
    ...paginationInformation,
  };
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findOne(contactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  return contact;
};

export const createContact = async ({photo, ...payload}) => {
  const url = await saveFileToLocal(photo)
  const contact = await Contact.create({
    ...payload, 
    
    photoUrl:url} );

  return contact;
};


export const updateContact = async (authContactId, payload, options = {}) => {
  const contact = await Contact.findOneAndUpdate(authContactId, payload, {
    new: true,
  });

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  return { contact };
};

export const deleteContact = async (authContactId) => {
  const contact = await Contact.findOneAndDelete(authContactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
};
