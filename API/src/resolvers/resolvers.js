import * as Models from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

require("dotenv").config();

export const resolvers = {
  Query: {
    hello: () => "hello",
    UserAll: () => Models.User.find(),
    UserById: (parent, args, context) => Models.User.findById(args.id),

    products: () => {
      return Models.Product.find();
    },
    product: (parent, args) => {
      console.log(args.id);
      return Models.Product.findById(args.id);
    },

    orders: () => {
      return Models.Order.find().populate("products").populate("user");
    },
    order: (parent, args) => {
      return Models.Order.findById(args.id);
    },
  },
  Mutation: {



    /*
    +-------------------------------------------------------------+
    | CREATE ORDER
    +-------------------------------------------------------------+
    */
    createOrder: (parent, args) => {
      const newOrder = new Models.Order({
        amountTotal: args.amountTotal,
        user: args.user,
        products: args.products,
      });
      return newOrder.save();
    },

    /*
    +-------------------------------------------------------------+
    | CREATE PRODUCT
    +-------------------------------------------------------------+
    */

    createProduct: (parent, args) => {
      const newProduct = new Models.Product({
        title: args.title,
        price: args.price,
        description: args.description,
      });
      return newProduct.save();
    },

    /*
    +-------------------------------------------------------------+
    | CREATE USER
    +-------------------------------------------------------------+
    */

    // createUser: async (parent, args, context) => {
    //   try {
    //     const human = new Human({ name: args.name, password: args.password });
    //     await human.save();
    //     return human;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    /*
    +-------------------------------------------------------------+
    | UPDATE
    +-------------------------------------------------------------+
    */
    async update(parent, args, context) {
      try {
        const User = new Models.User();
        await User.findByIdAndUpdate({
          id: args.id,
          name: args.name,
          password: args.password,
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
    async signup(_, { name, password }) {
      const User = new Models.User({
        name,
        password: await bcrypt.hash(password, 10),
      });
      await User.save();
      console.log("Enregistrer");
      // return json web token
      return jwt.sign({ name: User.name }, process.env.JWT_SECRET, {
        expiresIn: "1y",
      });
    },
    /*
    +-------------------------------------------------------------+
    | LOGIN
    +-------------------------------------------------------------+
    */
    async login(_, { name, password }) {
      const User = await Models.User.find({ name: name });

      if (!User) {
        throw new Error("No user with that name");
      }
      //   console.log(human);
      const valid = bcrypt.compareSync(password, User.password);
      console.log(valid);
      if (!valid) {
        throw new Error("Incorrect password");
      }
      console.log("Connecter");
      // return json web token
      return jwt.sign(
        { id: User._id, name: User.name },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
    },
  },
};
