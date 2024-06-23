import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  if (req.user) {
    filter.userId = req.user._id;
  }

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });
  res.json({
    status: 200,
    message: `Successfully found all contacts!`,
    data: contacts,
  });
};

const setAuthContactId = (req) => {
  let authContactId = {};
  const { contactId } = req.params;
  const userId = req.user._id;
  if (contactId) {
    authContactId = { _id: contactId };
  }
  if (userId) {
    authContactId = { ...authContactId, userId: userId };
  }

  return authContactId;
};
export const getContactsByIdController = async (req, res, next) => {
  const authContactId = setAuthContactId(req); 
  const contact = await getContactById(authContactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${authContactId._id}!`,
    data: contact,
  });
};

export const createContactsController = async (req, res) => {
  const contact = await createContact({ userId: req.user._id, ...req.body }); 

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const patchContactsController = async (req, res, next) => {
  const authContactId = setAuthContactId(req);
  const result = await updateContact(authContactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: contact.contact,
  });
};

export const deleteContactsController = async (req, res, next) => {
  const authContactId = setAuthContactId(req);
  const contact = await deleteContact(authContactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
