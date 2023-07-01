var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Schema as Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
const userScheme = new Schema({
    username: {
        type: String,
        required: [true, "username field is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "email field is required"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
        ]
    },
    password: {
        type: String,
        required: [true, "password field is required"],
        minlength: 6,
        select: false,
    },
    imageURL: {
        type: String,
    }
}, {
    timestamps: true,
});
userScheme.pre("save", function (next) {
    if (!this.imageURL) {
        this.imageURL = `https://api.dicebear.com/6.x/adventurer/svg?seed=${this.username}`;
    }
    next();
});
userScheme.pre("save", function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});
userScheme.methods.matchPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(password, this.password);
    });
};
const User = model("User", userScheme);
export default User;
//# sourceMappingURL=user.js.map