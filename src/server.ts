import express, { response } from 'express';

const app = express();

app.get("/", (request, response) => {
  return response.json({message: "Hello!"})
})

app.listen(3333)