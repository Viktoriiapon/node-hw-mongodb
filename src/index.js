import { initMongoConnection } from './db/initMongoConnection.js';
import { Contact } from './db/models/contact.js';
import {setupServer} from './server.js';

// const bootstrap = async () => {
//     await initMongoConnection();
//     setupServer();
//   };
  
//   bootstrap();
(async () => {
    await initMongoConnection();
    const contacts = await Contact.find({});
    console.log(contacts);
    setupServer();
  })();


