import {Router} from 'express';
import { createContactsController,
     deleteContactsController,
     getContactsByIdController,
      getContactsController,
       patchContactsController,
        // putContactsController
     } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';


export const getContactsRouter = Router();

getContactsRouter.get('/contacts', ctrlWrapper(getContactsController));

  getContactsRouter.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));

  getContactsRouter.post('/contacts', ctrlWrapper(createContactsController));

  getContactsRouter.patch('/contacts/:contactId', ctrlWrapper(patchContactsController));

//   getContactsRouter.put('/contacts/:contactId', ctrlWrapper(putContactsController));

  getContactsRouter.delete('/contacts/:contactId', ctrlWrapper(deleteContactsController));

  


