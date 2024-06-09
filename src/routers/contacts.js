import {Router} from 'express';
import { createContactsController,
     deleteContactsController,
     getContactsByIdController,
      getContactsController,
       patchContactsController,
        // putContactsController
     } from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createContactSchema, updateContactSchema } from '../validation/contact.js';


export const contactsRouter = Router();

contactsRouter.get('/contacts',

ctrlWrapper(getContactsController));

contactsRouter.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));

contactsRouter.post('/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactsController));

  contactsRouter.patch('/contacts/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactsController));

//   getContactsRouter.put('/contacts/:contactId', ctrlWrapper(putContactsController));

contactsRouter.delete('/contacts/:contactId', ctrlWrapper(deleteContactsController));

  


