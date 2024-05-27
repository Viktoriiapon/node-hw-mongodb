// import mongoose from 'mongoose';
// import { env } from '../utils/env.js';
// import { ENV_VARS } from '../constants/index.js';

// export const initMongoConnection = async () => {
//   const connectionLink = `mongodb+srv://${env(ENV_VARS.MONGODB_USER)}:${env(
//     ENV_VARS.MONGODB_PASSWORD,
//   )}@${env(ENV_VARS.MONGODB_URL)}/${env(
//     ENV_VARS.MONGODB_DB,
//   )}?retryWrites=true&w=majority&appName=Viktoriia`;
//   
//   try {
//     await mongoose.connect(connectionLink);
//     console.log('Mongo connection successfully established!');
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };


import mongoose from "mongoose";
import { ENV_VARS } from "../constants/index.js";
import { env } from '../utils/env.js';

export const initMongoConnection = async () => {
  const MONGODB_USER = env(ENV_VARS.MONGODB_USER);
  const MONGODB_PASSWORD = encodeURIComponent(env(ENV_VARS.MONGODB_PASSWORD)); 
  const MONGODB_URL = env(ENV_VARS.MONGODB_URL);
  const MONGODB_DB = env(ENV_VARS.MONGODB_DB);

  console.log('MONGODB_USER:', MONGODB_USER);
  console.log('MONGODB_PASSWORD:', MONGODB_PASSWORD);
  console.log('MONGODB_URL:', MONGODB_URL);
  console.log('MONGODB_DB:', MONGODB_DB);

  const connectionLink =
    `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority&appName=Viktoriia`;

  console.log('MongoDB Connection Link:', connectionLink);

  try {
    await mongoose.connect(connectionLink);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('Error during Mongo connection:', error);
    throw error;
  }
};
