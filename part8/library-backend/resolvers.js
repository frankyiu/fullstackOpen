const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const Book = require("./model/book");
const Author = require("./model/author");
const User = require("./model/user");
const JWT_SECRET = "NEED_HERE_A_SECRET_KEY";

const { PubSub } = require("graphql-subscriptions");
const author = require("./model/author");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {};
      let authorFilter = { path: "author" };
      if (args.genre) filter.genres = args.genre;
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          filter.author = author.id;
        }
      }
      return Book.find(filter).populate(authorFilter).exec();
    },
    allAuthors: async () => {
      const authors = await Author.find({}).populate("books");
      return authors;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser)
        throw new AuthenticationError("Authoriztion Header missing");
      //find author object first
      let author = await Author.findOne({ name: args.author }).exec();
      if (author === null) {
        //create authro
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }
      const book = new Book({ ...args, author });
      try {
        const newBook = await book.save();
        author.books.push(newBook._id);
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser)
        throw new AuthenticationError("Authoriztion Header missing");
      const author = await Author.findOne({ name: args.name }).exec();
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      });

      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: { subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]) },
  },
  Author: {
    bookCount: async (root) => {
      return root.books.length;
    },
  },
};

module.exports = resolvers;
