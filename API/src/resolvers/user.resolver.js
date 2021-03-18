import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as Models from "../models";
module.exports = {
  Query: {
    users: () => {
      return Models.User.find();
    },
    user: (parent, args) => {
      return Models.User.findById(args.id);
    }
  },
  Mutation: {
  /*
    +-------------------------------------------------------------+
    | UPDATE
    +-------------------------------------------------------------+
    */
    update: async (parent, args, context)=> {
      try {
        const User = new Models.User();
        await User.findByIdAndUpdate({
          id: args.id,
          Firstname: args.Firstname,
          Lastname: args.Lastname,
          Phone: args.Phone,
          Adress: args.Adress,
          Email: args.Email,
          Password: args.Password,
          IsAdmin: args.IsAdmin,
        });
        return User;
      } catch (error) {
        console.log(error);
      }
    },
    /*
    +-------------------------------------------------------------+
    | SIGN UP
    +-------------------------------------------------------------+
    */
    signup: async (parent,args,context)=> {
      const User = new Models.User({
        id: args.id,
        Firstname: args.Firstname,
        Lastname: args.Lastname,
        Phone: args.Phone,
        Adress: args.Adress,
        Email: args.Email,
        Password: await bcrypt.hash(args.Password, 10),
        IsAdmin: args.IsAdmin,
      });
      await User.save();
      console.log("Enregistrer");
      // return json web token
      return jwt.sign({ Email: User.Email }, process.env.JWT_SECRET, {
        expiresIn: "1y",
      });
    },
    /*
    +-------------------------------------------------------------+
    | LOGIN
    +-------------------------------------------------------------+
    */
    login: async (parent,args,context)=> {
      const User = await Models.User.find({ Email: args.Email });

      if (!User) {
        throw new Error("No user with that name");
      }
      //   console.log(human);
      const valid = bcrypt.compareSync(args.Password, User.Password);
      console.log(valid);
      if (!valid) {
        throw new Error("Incorrect password");
      }
      console.log("Connecter");
      // return json web token
      return jwt.sign(
        { id: User._id, Email: User.Email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
    },
  },
};