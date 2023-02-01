const express = require("express");
const postgres = require("postgres");
const cors = require("cors")
require("dotenv").config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PROJECT_NAME } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${PROJECT_NAME}`;
const sql = postgres(URL, { ssl: "require" });
const app = express();
const port = 8000;

app.use(cors());

app.get("/", async (request, response) => {
  response.header({ "Access-Control-Allow-Origin": "*" });
  const result =
    await sql`SELECT * FROM citybike WHERE duration > 10 AND covered_distance > 10 LIMIT 1000`;
  response.json({ data: result });
});
app.get("/station", async (request, response) => {
   response.header({ "Access-Control-Allow-Origin": "*" });
  const station = await sql`SELECT * FROM address`;
  response.json({ data: station });
//   console.log(address);
});
app.listen(port, () => {
  console.log(`Now listening on port ${port}...`);
});
