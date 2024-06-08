

import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      contactType: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
  },
  { timestamps: true, versionKey: false },
);

export const Contact = model('contacts', contactSchema);
