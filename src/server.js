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

import { errorHandlerMiddleware } from './middlewares/errorHandler.js';
import { notFoundMiddleware } from './middlewares/notFoundHandler.js';

import { getContactsRouter } from './routers/contacts.js';

export const setupServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.use(express.json());

 app.use(getContactsRouter);
 

  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);

  const PORT = env(ENV_VARS.PORT, 3000);
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};


