// userId - string, required
// accessToken - string, required
// refreshToken - string, required
// accessTokenValidUntil - Date, required
// refreshTokenValidUntil - Date, required

import { model, Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    accessToken: {type: String, required: true},
    refreshToken: {type: String, required: true},
    accessTokenValidUntil:{type: Date, required: true},
    refreshTokenValidUntil:{type: Date, required: true},
    userId:{type: Schema.ObjectId, required: true, unique: true},
  },
  { timestamps: true, versionKey: false },
);

export const Session = model('sessions', sessionSchema);



  
