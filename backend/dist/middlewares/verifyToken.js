import jwt from "jsonwebtoken";
import devDebug from "../utils/devDebug";
import getEnv from "../utils/env";
/**
 * This middleware take jwt token `Bearer {token}` Authorization request headers and verify it
 * @param req Express request
 * @param res Express response
 * @param next Express next middleware function
 * @returns jwt token by req.token
 */
export default function verifyToken(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        devDebug("authorization headers is unavailable");
        return;
    }
    const token = authorization.split(" ")[1];
    if (!token) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        devDebug("authorization token is unavailable");
        return;
    }
    // verify the jwt token
    jwt.verify(token, getEnv("accessToken"), (err, decode) => {
        if (err) {
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
            devDebug("token is not valid");
            return;
        }
        // send this jwt token
        req.token = decode;
        next();
    });
}
