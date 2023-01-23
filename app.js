const express = require('express');
const postgres =require('postgres');
require ('dotenv').config()

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PROJECT_NAME} = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${PROJECT_NAME}`;
const sql = postgres(URL, { ssl: 'require' });
const app = express();
const port = 8000;

app.get("/", async (request, response) => {
   response.header({ "Access-Control-Allow-Origin": "*" });
   const result = await sql`SELECT * FROM citybike WHERE duration > 10 AND covered_distance > 10 LIMIT 100`;
   // const time = await sql`SELECT * FROM citybike WHERE duration > 10`;
   // const distance = await sql`SELECT * FROM citybike WHERE covered_distance > 10`;
   // console.log(result);
   response.json({ data: result });
   // response.json({ data: [
   //     {name: "Alice", id: 1},
   //     {name: "Bob", id: 2},
   // ]
   //    "Hello World!"
   // });
});
app.listen(port, () => {
   console.log(`Now listening on port ${port}...`)
});
