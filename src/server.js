import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';

import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';



export const setupServer = ()=>{

   
    const app = express();
    

    app.use(pino({
        transport:{ 
            target:'pino-pretty',}
    }));

    app.use(cors());

    // app.use(express.json());


    app.get('/contacts', (req, res) => {
        console.log(req.someId)
        res.json({
          message: `Successfully found contact with id ${contactId}!`,
        });
      });

      app.use(notFoundMiddleware);
      app.use(errorHandlerMiddleware);
      
  
   
    // app.use('*', (req, res) => {
    //     res.status(404).json({
    //       message: 'Not found',
    //     });
    //   });
const PORT = env(ENV_VARS.PORT, 3000);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}