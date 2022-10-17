import { Request, Response, Router } from "express";
import wrap from "express-async-handler";
import redis from "redis";
import { logger } from "../../loggers/logger";
import { UserModel } from "../../models/user";

let redisClient = redis.createClient();

if (!redisClient) {
  logger.error("Redis client not created");
} else {
  logger.info("Redis client created");
}

const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  route.get(
    "/",
    wrap(async (req: Request, res: Response) => {
      redisClient.get('users', async (error, users) => {
        if (error) logger.error(error);
        if (users) {
          logger.info("Users found in cache");
          res.json(JSON.parse(users)).status(200);
        }
        else {
          logger.info("Users not found in cache");
          const users = await UserModel.find({});
          redisClient.setex('users', 10, JSON.stringify(users));
          res.json(users).status(200);
        }
    })
    })
  );
};
