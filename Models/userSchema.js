import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    profileImage: {
      type: String,
      default: function () {
        return `https://joeschmoe.io/api/v1/${this.firstName}`;
      },
    },
    orders: [{ type: Schema.Types.ObjectId, ref: "orders" }],
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// virtual properties
userSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

userSchema.virtual("domain").get(function () {
  return this.email.split("@")[1].split(".")[0];
});

// pre hash
userSchema.pre("save", function (next) {
  // ---> use 1 of 2 hash options
  /*   if (this.isModified("password")) { */
  const hashedPassword = bcrypt.hashSync(this.password, 10);
  this.password = hashedPassword;
  /*  } */
  console.log("Password hashed on Pre-Save into DB");
  next();
});

userSchema.post("save", function () {
  console.log("I am Post-Save function");
});

const UsersCollection = mongoose.model("users", userSchema);
// Create index
UsersCollection.createIndexes({ email: -1 });

export default UsersCollection;
