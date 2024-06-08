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


export const getContactsRouter = Router();

getContactsRouter.get('/contacts',

ctrlWrapper(getContactsController));

  getContactsRouter.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));

  getContactsRouter.post('/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactsController));

  getContactsRouter.patch('/contacts/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactsController));

//   getContactsRouter.put('/contacts/:contactId', ctrlWrapper(putContactsController));

  getContactsRouter.delete('/contacts/:contactId', ctrlWrapper(deleteContactsController));

  


