import devDebug from "../../utils/devDebug";
/**
 * This middleware take classroomUserRole from verifyClassroomUserAvailable middleware and check is user classroom role is admin or not
 * @param req Express request
 * @param res Express response
 * @param next Express next middleware function
 * @returns
 */
export default async function verifyClassroomAdmin(req, res, next) {
    const classroomUserRole = req.classroomUserRole;
    if (classroomUserRole !== "admin") {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
        devDebug("user not admin in this classroom");
        return;
    }
    next();
}
