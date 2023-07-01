import { MongooseError } from "mongoose";
class CustomError extends MongooseError {
    constructor(message, statusCode) {
        if (typeof message == "object") {
            super(message.join(", "));
        }
        else if (typeof message == "string") {
            super(message);
        }
        else {
            super(message);
        }
        this.statusCode = statusCode;
    }
}
export default CustomError;
//# sourceMappingURL=errorResponse.js.map