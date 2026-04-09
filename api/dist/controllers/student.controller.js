import { asyncHandler } from "../utils/asyncHandler.js";
import * as StudentService from "../services/student.service.js";
export const updateProfile = asyncHandler(async (req, res) => {
    const profile = await StudentService.updateStudentProfile(req.user.id, req.body);
    res.status(200).json({ profile });
});
export const uploadResume = asyncHandler(async (req, res) => {
    if (!req.file) {
        const error = new Error("No file uploaded");
        error.status = 400;
        throw error;
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    const profile = await StudentService.updateResumeUrl(req.user.id, fileUrl);
    res.status(200).json({ profile });
});
export const getPublicProfile = asyncHandler(async (req, res) => {
    const profile = await StudentService.getStudentPublicProfile(req.params.id);
    res.status(200).json({ profile });
});
//# sourceMappingURL=student.controller.js.map