import {Router} from 'express';
import { createContactsController,
     deleteContactsController,
     getContactsByIdController,
      getContactsController,
       patchContactsController,
        // putContactsController
     } from '../controllers/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createContactSchema, updateContactSchema } from '../validation/contact.js';


export const contactsRouter = Router();

contactsRouter.use('/', authenticate);

contactsRouter.get('/',ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactsByIdController));

contactsRouter.post('/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactsController));

  contactsRouter.patch('/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactsController));

//   getContactsRouter.put('/contacts/:contactId', ctrlWrapper(putContactsController));

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactsController));

  


