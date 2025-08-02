import { Request, Response } from "express";
import { generateBooks } from "../services/bookService.ts";

export function getBooks(req: Request, res: Response) {
  const {
    seed = "default",
    page = "0",
    lang = "en",
    likes = "0",
    reviews = "0",
  } = req.query;

  const books = generateBooks({
    seed: seed.toString(),
    page: parseInt(page.toString(), 10),
    lang: lang.toString(),
    likes: parseFloat(likes.toString()),
    reviews: parseFloat(reviews.toString()),
  });

  res.json({ books });
}
