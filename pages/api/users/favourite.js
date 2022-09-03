import nc from "next-connect";
import User from "models/User";
import db from "lib/db";
import jwt from "jsonwebtoken";

const handler = nc();

handler.post(async (req, res) => {
  const token = req.headers.authorization;

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  await db.connect();
  const user = await User.findOne({ _id: decoded._id });
  await user.favouriteList.push(req.body.id);
  await user.save();

  await db.disconnect();
});

export default handler;
