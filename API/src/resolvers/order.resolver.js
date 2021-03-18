import * as Models from "../models";
module.exports = {
  Query: {
    orders: () => {
          return Models.Order.find()
          .populate('products').populate('users')
    },
    order: (parent, args) => {
      return Models.Order.findById(args.id);
    },
  },
  Mutation: {
    createOrder: (parent, args) => {
      const newOrder = new Models.Order({
        AmountTotal: args.AmountTotal,
        User: args.User,
        Products: args.Products,
        Status: args.Status
      });
      return newOrder.save();
    },
  },
};
