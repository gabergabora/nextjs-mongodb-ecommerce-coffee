import db from "lib/db";
import Product from "models/Product";
import nc from "next-connect";

const handler = nc();

handler.get(async (req, res) => {
  db.connect();

  const product = await Product.find({ _id: req.query.id }).lean();

  db.disconnect();

  res.send(product[0]);
});

export default handler;
