import UsersCollection from "../Models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res, next) => {
  try {
    const users = await UsersCollection.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const singleUser = await UsersCollection.findById(id);
    res.json({ success: true, user: singleUser });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  console.log(req.file);
  try {
    // before storing user into database, hash user password
    // bcrypt.hash asynchronous // bcrypt hashSync synchronous
    // bcrypt.compare asynchronous // bcrypt.compareSync synchronous
    //----------------------------------------------//
    // ---> use 1 of 2 hash options
    /*  const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword);
    req.body.password = hashedPassword; */
    //----------------------------------------------//
    const user = new UsersCollection(req.body);
    user.profileImage = `http://localhost:4000/${req.file.filename}`;
    await user.save();
    console.log(user.fullName);
    res.json({ success: true, record: user });
  } catch (error) {
    next(error);
  }
};

export const patchUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedUser = await UsersCollection.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingUser = await UsersCollection.findById(id);

    if (existingUser) {
      const deleteStatus = await UsersCollection.deleteOne({
        _id: existingUser._id,
      });
      res.json({ success: true, status: deleteStatus });
    } else {
      throw new Error("record id doesn't exist");
    }
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const user = await UsersCollection.findOne({
      email: req.body.email.toLowerCase(),
    });
    if (user) {
      const verify = await bcrypt.compare(req.body.password, user.password);
      if (verify) {
        let token = jwt.sign(
          {
            id: user._id,
            email: user.email,
            role: user.role,
            name: user.fullName,
          },
          process.env.SECRET,
          { expiresIn: "100h" }
        );
        const updatedUser = await UsersCollection.findByIdAndUpdate(
          user._id,
          { token: token },
          { new: true }
        );
        res.header("token", token);
        res.json({ success: true, data: updatedUser });
      } else {
        throw new Error("password is not correct");
      }
    } else {
      throw new Error("email doesn't exist");
    }
  } catch (error) {
    next(error);
  }
};