import { Types } from "mongoose";

const isValidObjectId = (_id: string) => {
    if (Types.ObjectId.isValid(_id)) {
        if ((String)(new Types.ObjectId(_id)) === _id) {
            return true;
        } 
        return false;
    }
    return false;
}

export default isValidObjectId;
