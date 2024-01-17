import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc"; 
import { createHash } from "crypto";
import { uuid } from "uuidv4";

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
                default_profile: {},
                verified: false,
                role: "unverified",
            },
        });
        return users
    }),

    // This part of the code is for creating a session and being able to use it when a new user is created, in this way being able to be redirected to the next form so that the user can finish filling in their data
    createSesion: publicProcedure
    .input(
        z.object({
            usersId: z.string(),
        })
    )
    .mutation(({ctx,input}) => {
        const token = uuid();
        const sessionExpirationDate = 86400;
        const expire = new Date(Date.now() + sessionExpirationDate)
        
        
        const session = ctx.db.user_sessions({
            //Here it is necessary to put all the fields that the model user_sessions has in prisma.schema    
        })
    })
})