import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import {createConnection} from "typeorm";
import bodyParser from "body-parser";
import { register, login, logout } from "./controller/userRepo";
import { getInstrumentById, getInstrumentByName, getInstruments } from "./controller/instrumentRepo";

console.log(process.env.NODE_ENV);
require("dotenv").config();

const app = express();
const router = express.Router();

const main = async() => {
    await createConnection();

  const redis = new Redis({
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  });
  const RedisStore = connectRedis(session);
  const redisStore = new RedisStore({
    client: redis,
  });

  app.use(bodyParser.json());

  app.use(
    session({
      store: redisStore,
      name: process.env.COOKIE_NAME,
      sameSite: "Strict",
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
      },
    } as any)
  );
  app.use(router);


  router.get("/", (req: any, res, next) => {
    req.session!.test = "hello";
    res.send("hello");
  });

  router.post("/register", async ({body: {email, firstname, lastname, password}}, res, next) => {
    try {
      console.log("params", {email, firstname, lastname, password});
      const userResult = await register(
        email,
        firstname,
        lastname,
        password
      );
      if (userResult && userResult.user) {
        res.send(`new user created, userId: ${userResult.user.id}`);
      } else if (userResult && userResult.messages) {
        res.send(userResult.messages[0]);
      } else {
        next();
      }
    } catch (ex: any) {
      res.send(ex.message);
    }
  });

  router.post("/login", async ({body:{email, password}, session:{userId}}:any, res, next) => {
    try {
      console.log("params", {email, password});
      const userResult = await login(email, password);
      if (userResult && userResult.user) {
          userId = userResult.user?.id;
        res.send(`user logged in, userId: ${userId}`);
      } else if (userResult && userResult.messages) {
        res.send(userResult.messages[0]);
      } else {
        next();
      }
    } catch (ex: any) {
      res.send(ex.message);
    }
  });
  router.post("/logout", async ({body:{email}, session:{userId}}: any, res, next) => {
    try {
      console.log("params", {email});
      const msg = await logout(email);
      if (msg) {
        userId = null;
        res.send(msg);
      } else {
        next();
      }
    } catch (ex: any) {
      console.log(ex);
      res.send(ex.message);
    }
  });

  router.post("/instrument", async ({body: id}, res, next) => {
    try {
      const instrumentResult = await getInstrumentById(id);

      if (instrumentResult && instrumentResult.entity) {
        res.send(instrumentResult.entity.name);
      } else if (instrumentResult && instrumentResult.messages) {
        res.send(instrumentResult.messages[0]);
      }
    } catch (ex: any) {
      console.log(ex);
      res.send(ex.message);
    }
  });

  router.post("/instrumentByName", async ({body: {name}}, res, next) => {
    try {
      const instrumentResult = await getInstrumentByName(name);
      console.log(name)
      if (instrumentResult && instrumentResult.entity) {
        res.send(instrumentResult.entity.name);
      } else if (instrumentResult && instrumentResult.messages) {
        res.send(instrumentResult.messages[0]);
      }
    } catch (ex: any) {
      console.log(ex);
      res.send(ex.message);
    }
  });

  router.post("/instruments", async (req, res, next) => {
    try {
      const instrumentResult = await getInstruments();
      if (instrumentResult && instrumentResult.entities) {
        let items = "";
        instrumentResult.entities.forEach((th) => {
          items += th.name + ", ";
        });
        res.send(items);
      } else if (instrumentResult && instrumentResult.messages) {
        res.send(instrumentResult.messages[0]);
      }
    } catch (ex: any) {
      console.log(ex);
      res.send(ex.message);
    }
  });
  app.listen({ port: process.env.SERVER_PORT }, () => {
    console.log(`Server ready on port ${process.env.SERVER_PORT}`);
  });
}

main();
