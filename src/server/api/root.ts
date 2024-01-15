import { createTRPCRouter } from "~/server/api/trpc";
import { signUpRouter } from "./routers/signUp";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  signUp: signUpRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
