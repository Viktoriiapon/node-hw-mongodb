import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.json({
    status: 200,
    message: `Successfully found all contacts!`,
    data: contacts,
  });
};
export const getContactsByIdController = async (req, res) => {
  const contactId = req.params.contactId;

  const contact = await getContactById(contactId);

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactsController = async (req, res) => {
  const { body } = req;

  const contact = await createContact(body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
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
