import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { Contact } from './db/models/contact.js';
import {setupServer} from './server.js';
import { createFolderIfNotExists } from './utils/createFolderIfNotExists.js';


(async () => {
    await initMongoConnection();
    const contacts = await Contact.find({});
    await createFolderIfNotExists(TEMP_UPLOAD_DIR);
    await createFolderIfNotExists(UPLOAD_DIR);
   
    setupServer();
  })();





  