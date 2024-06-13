
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
  const {sortBy, sortOrder} = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

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
export const getContactsByIdController = async (req, res, next) => {
  const contactId = req.params.contactId;

  const contact = await getContactById(contactId);

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactsController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact.contact,
  });
};


export const patchContactsController = async (req, res, next) => {
  
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: contact.contact,
  });
};

// export const putContactsController = async (req, res) => {
//     const { body } = req;
//     const { contactId } = req.params;
//     const {isNew, contact } = await upsertContact(contactId, body, {upsert: true});
//     const status = isNew ? 201 : 200;
  
//     res.status(status).json({
//       status: status,
//       message: `Successfully put a contact!`,
//       data: contact,
//     });
//   };

export const deleteContactsController = async (req, res, next) => {
  const contactId = req.params.contactId;

  await deleteContact(contactId);


  res.sendStatus(204);
};
