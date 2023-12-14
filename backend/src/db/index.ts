import mongoose from "mongoose";

function connect() {
  mongoose.connect(process.env.DATABASE_URL as string).then(async () => {
    console.log("MongoDB is connected");
  });
}

export const db = {
  connect,
};
