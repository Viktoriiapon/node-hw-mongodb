import { initMongoConnection } from './db/initMongoConnection.js';
import { Contact } from './db/models/contact.js';
import {setupServer} from './server.js';


(async () => {
    await initMongoConnection();
    const contacts = await Contact.find({});
   
    setupServer();
  })();





  