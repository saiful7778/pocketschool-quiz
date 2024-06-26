import getEnv from "./utils/env";
import expressApp from "./expressApp";
import connectDB from "./utils/connectDB";
(async () => {
    const app = expressApp();
    await connectDB();
    const port = getEnv("port");
    app.listen(port, () => {
        console.log(`server is running on port:${port}`);
    });
})();
