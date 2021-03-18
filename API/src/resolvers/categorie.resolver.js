import * as Models from "../models";
module.exports = {
  Query: {
    categories: () => {
          return Models.Categorie.find()
          .populate('Product');
    },
    categorie: (parent, args) => {
      return Models.Categorie.findById(args.id);
    },
  },
  Mutation: {
    createCategorie: (parent, args) => {
      const newCategorie = new Models.Categorie({
        Title:args.Title,
        Products:args.Products
      });
      return newCategorie.save();
    },
  },
};
