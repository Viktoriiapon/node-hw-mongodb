// import express from 'express';
// import pino from 'pino-http';
// import cors from 'cors';

// import { env } from './utils/env.js';
// import { ENV_VARS } from './constants/index.js';

// import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
// import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';

// import { getAllContacts, getContactById } from './services/contacts.js';

// export const setupServer = () => {
//   const app = express();

//   app.use(
//     pino({
//       transport: {
//         target: 'pino-pretty',
//       },
//     }),
//   );

  // app.use(cors());

//   app.get('/contactsForHw', async (req, res) => {
//     const contacts = await getAllContacts();
//     res.json({
//       status: 200,
//       message: `Successfully found all contacts!`,
//       data: contacts,
    
//     });
   
//   });
//   console.log(contacts)
//   app.get('/contactsForHw/:contactId', async (req, res) => {
//     const contactId = req.params.contactId;
//     const contact = await getContactById(_id);

//     if (!contact) {
//       return res.status(404).json({
//         status: 404,
//         message: `Contact with id ${_id} not found!`,
//       });
//     }

//     res.json({
//       status: 200,
//       message: `Successfully found contact with id ${contactId}!`,
//       data: contact,
//     });
//   });

//   app.use(notFoundMiddleware);
//   app.use(errorHandlerMiddleware);

//   const PORT = env(ENV_VARS.PORT, 3000);
//   app.listen(PORT, () => {
//     console.log(`Server is running on ${PORT}`);
//   });
// };

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';

import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';

import { getAllContacts, getContactById } from './services/contacts.js';

export const setupServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.json({
        status: 200,
        message: `Successfully found all contacts!`,
        data: contacts,
      });
    } catch (error) {
      console.error('Error while fetching all contacts:', error);
      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const contactId = req.params.contactId;
    try {
      const contact = await getContactById(contactId);
      if (!contact) {
        return res.status(404).json({
          status: 404,
          message: `Contact with id ${contactId} not found!`,
        });
      }
      res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      console.error(`Error while fetching contact with id ${contactId}:`, error);
      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      });
    }
  });

  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);

  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};


