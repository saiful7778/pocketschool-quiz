import devDebug from "./devDebug";
/**
 * This function resolve all promises in this server app
 * @param inputFunction
 * @param res
 */
export default async function serverHelper(inputFunction, res) {
    try {
        await inputFunction();
    }
    catch (err) {
        if (err instanceof Error) {
            devDebug(err.message);
            res.status(500).json({
                success: false,
                message: "server error",
            });
        }
    }
}
