import "reflect-metadata";

import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import { buildSchema } from "type-graphql";

import { UserResolver } from "modules/api/resolvers/User.resolver";
import { initializeDatabase } from "modules/database";

let handler;

const bootstrap = async () => {
  await initializeDatabase();

  if (!handler) {
    const schema = await buildSchema({
      resolvers: [UserResolver]
    });

    const server = new ApolloServer({ schema });

    handler = server.createHandler({
      path: "/api/graphql"
    });
  }
  return handler;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const apolloServerHandler = await bootstrap();
  return apolloServerHandler(req, res);
};

export const config = {
  api: {
    bodyParser: false
  }
};
