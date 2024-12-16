declare module "next-connect" {
  import { RequestHandler } from "express";
  const nextConnect: () => RequestHandler;
  export = nextConnect;
}
