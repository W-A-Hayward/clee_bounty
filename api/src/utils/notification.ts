import prisma from "../lib/prisma.ts";
import type { NotificationType } from "@prisma/client";

export const createNotification = (
  userId: string,
  type: NotificationType,
  title: string,
  message: string,
  link?: string,
) =>
  prisma.notification.create({
    data: { userId, type, title, message, link: link ?? null },
  });
