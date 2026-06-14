import express from "express";
import { renderPage } from "./render.jsx";

const app = express();

app.get("/", (_req, res) => {
  // Call our render function and send the result as HTML
  const html = renderPage();
  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});