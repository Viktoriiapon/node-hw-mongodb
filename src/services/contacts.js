import createHttpError from 'http-errors';
import { Contact } from '../db/models/contact.js';
import { SORT_ORDER } from '../constants/index.js';

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
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  return contact;
};

export const createContact = async (payload) => {
  const newContact = await Contact.create({ ...payload, userId });

  return newContact;
};


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
