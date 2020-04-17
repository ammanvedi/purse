import {Request, Response} from "express";

export type RouteHandler = (req: Request, res: Response) => void | Promise<void>