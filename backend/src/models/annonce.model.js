import * as Mongoose from 'mongoose';

const AnnonceSchema = new Mongoose.Schema(
  {
    title: {
      type: String,
      unique: [true, 'Please add an unique title'],
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      max: [300, 'Please add a valid description, value is {VALUE}, max 300 character'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: [1, 'Please add a valid price, value is {VALUE}, min 1 USD'],
      max: [100, 'Please add a valid price, value is {VALUE}, max 100 USD'],
    },
    category: {
      type: String,
      enum: ['fruit', 'vegetable'],
      default: 'fruit',
    },
    photo: {
      type: String,
      default: 'uploads/no-image.jpeg',
    },
    owner: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { versionKey: false },
);

export const AnnonceModel = Mongoose.model('Annonce', AnnonceSchema);
