import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc"; 
import { createHash } from "crypto";


export const signUpRouter = createTRPCRouter({
    
    createUser: publicProcedure
    .input(
        z.object({
            name: z.string(),
            secret_hash: z.string(),
            email: z.string().email("Invalit email format"),
            mobile: z.string().regex(/^[0-9]{10}$/, "Invalid mobile number format"),

        })
    )
    .mutation(({ ctx, input }) => {
        //this hash the pasword  
        const hash = createHash('sha256')
        const hashedPassword =  hash.update(input.secret_hash).digest('hex')
        const passwordInt = parseInt(hashedPassword, 16)
        
        const users =  ctx.db.users.create({
            data:{
                name: input.name,
                email: input.email,
                mobile: input.mobile,
                secret_hash: passwordInt,
                status: "conected",
                default_profile: {},
                verified: false,
                role: "client",
            },
        });
        return users
    }),  

})