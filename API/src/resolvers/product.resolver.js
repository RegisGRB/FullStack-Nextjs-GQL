import * as Models from "../models";
module.exports = {
  Query: {
    products: () => {
      return Models.Product.find();
    },
    product: (parent, args) => {
      return Models.Product.findById(args.id);
    }
  },
  Mutation: {
    createProduct: (parent, args) => {
      const newProduct = new Models.Product({
        Title: args.Title,
        Price: args.Price,
        Url:args.Url,
        Description: args.Description,
      });
      return newProduct.save();
    },
  },
};
