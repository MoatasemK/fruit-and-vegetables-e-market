import * as Mongoose from 'mongoose';

const UserSchema = new Mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, 'Please add a fullname'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        // eslint-disable-next-line no-useless-escape
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

export const UserModel = Mongoose.model('User', UserSchema);
