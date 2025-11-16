import express from "express";

export const app = new express();

app.get("/test", (req, res) => {
  res.json("Hello");
});
