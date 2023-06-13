import { MongooseError } from "mongoose";

class CustomError extends MongooseError {
    statusCode: number;

    constructor(message: string | string[], statusCode: number) {
        if (typeof message == "object") {
            super(message.join(", "));
        } else if (typeof message == "string") {
            super(message);
        } else {
            super(message);
        }
        this.statusCode = statusCode;
    }
}

export default CustomError; 
