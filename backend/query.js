const con = require("./conn.js");

con.connect();
const db = con.db("testDb");
async function get() {
  const data = await db.collection("col").find().toArray();
  console.log(data[0].name)
  con.close()
}
get()
console.log("Pinged your deployment. You successfully connected to MongoDB!");
