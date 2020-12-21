import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import * as controllers from "./controllers";
import errorHandler from "./middlewares/errorHandler";
import { PORT, MONGO_URI } from "./config";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
console.info("✔️  Connected to MongoDB");

const app = express();

app.disable("x-powered-by");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

server.applyMiddleware({ app });

app.get("/", (req, res) =>
  res.send(`Location Service Running on Port ${PORT}`)
);
app.use("/maps", controllers.Maps);

app.use((req, res, next) => next(new Error("Invalid Route")));
app.use(errorHandler);

app.listen(PORT, () => {
  console.info(`✔️  Location Service Running on Port ${PORT}`);
});

module.exports = app; // for testing
