import CustomError from "../utils/errorResponse.js";
// Not found URL
export const invalidPathHandler = (req, res, next) => {
    res.status(404);
    res.json({ message: "Resource not found." });
};
const errorHandler = (err, req, res, next) => {
    let error = Object.assign({}, err);
    error.message = err.message;
    if (process.env.NODE_ENV == "development") {
        console.log("This is an error");
        console.log(err.message);
    }
    if (err.name == "MongoServerError" && err.code === 11000) {
        let duplicatedField = err.keyValue;
        let fieldKey = Object.keys(duplicatedField).pop();
        error = new CustomError(`${fieldKey} already exists.`, 400);
    }
    if (err.name === "ValidationError") {
        if (typeof err.errors === "object") {
            const errMsg = Object.values(err.errors).map((val) => val.message);
            error = new CustomError(errMsg, 400);
        }
    }
    if (err.name === "CastError") {
        error = new CustomError(`Resource Not Found.`, 404);
    }
    res
        .status(error.statusCode || 500)
        .json({ message: error.message || "Server Error" });
};
export default errorHandler;
//# sourceMappingURL=errorHandler.js.map