import Mongoose from 'mongoose';

export const dbConnect = async () => {
  await Mongoose.connect(process.env.MONGO_URI);

  console.log('-- 🥞 DB Connected Successfully');
};

dbConnect();
