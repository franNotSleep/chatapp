import { Schema as Schema, Types, model } from "mongoose";

import bcrypt from "bcryptjs";

export interface IUser {
  _id: Types.ObjectId; 
  username: string;
  email: string;
  password: string;
  created: Date;
  matchPassword: (password: string) => Promise<boolean>;
  imageURL: string;
}

const userScheme = new Schema<IUser>(
  {
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
  },
  {
    timestamps: true,
  }
);

userScheme.pre("save", function(next) {
  if (!this.imageURL) {
    this.imageURL = `https://api.dicebear.com/6.x/adventurer/svg?seed=${this.username}`; 
  }
  next();
})

userScheme.pre("save", function(next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = bcrypt.hashSync(this.password, 10);
  next();
})

userScheme.methods.matchPassword = async function(password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
}

const User = model("User", userScheme);

export default User;
