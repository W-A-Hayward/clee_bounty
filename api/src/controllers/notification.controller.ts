import { asyncHandler } from "../utils/asyncHandler.ts";
import { Request, Response } from "express";
import * as notifServices from "../services/notification.service.ts";

export const getAll = asyncHandler((req: Request, res: Response) => {
  const notifs = await notifServices.fetchAll((req as any).user.id);
  res.status(200).json({ notifications: notifs });
});

export const markOneRead = asyncHandler((req: Request, res: Response) => {
  const notif = await notifServices.readOne(
    (req as any).user.id,
    req.params.id,
  );
  res.status(200).json({ notifications: notif });
});

export const markAllRead = asyncHandler((req: Request, res: Response) => {
  const notifs = await notifServices.readAll((req as any).user.id);
  res.status(200).json({ notifications: notifs });
});
