import { Request, Response } from "express";

const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({ msg: `this is ${req.url} url is not found` });
};

export default notFoundHandler;
