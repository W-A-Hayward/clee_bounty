import { asyncHandler } from "../utils/asyncHandler.js";
import * as notifServices from "../services/notification.service.js";
export const getAll = asyncHandler(async (req, res) => {
    const notifs = await notifServices.fetchAll(req.user.id);
    res.status(200).json({ notifications: notifs });
});
export const markOneRead = asyncHandler(async (req, res) => {
    const notif = await notifServices.readOne(req.user.id, req.params.id);
    res.status(200).json({ notifications: notif });
});
export const markAllRead = asyncHandler(async (req, res) => {
    const notifs = await notifServices.readAll(req.user.id);
    res.status(200).json({ notifications: notifs });
});
//# sourceMappingURL=notification.controller.js.map