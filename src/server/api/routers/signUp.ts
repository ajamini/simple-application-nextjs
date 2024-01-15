import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc"; 
import { createHash } from "crypto";

export const signUpRouter = createTRPCRouter({
    
    createUser: publicProcedure
    .input(
        z.object({
            name: z.string(),
            secret_hash: z.string(),
            email: z.string(),
            mobile: z.string()

        })
    )
    .mutation(({ ctx, input }) => {
        //this hash the pasword  
        const hash = createHash('sha256')
        const hashedPassword =  hash.update(input.secret_hash).digest('hex')
        const IntHash = parseInt(hashedPassword, 10)
        
        const users =  ctx.db.users.create({
            data:{
                name: input.name,
                email: input.email,
                mobile: input.mobile,
                secret_hash:IntHash,
                status: "conected",
                default_profile: {},
                verified: false,
                role: "unverified",
            },
        });
        return users
    }),  

})