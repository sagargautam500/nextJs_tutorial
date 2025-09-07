import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers,signIn,signOut,auth } = NextAuth({
  providers: [

     Credentials({
          //  credentials:{},

           async authorize(credentials) {
            
              let user=null;

              //validate user
             

              //get user

              user={
                id:'1',
                name:'Sagar Gautam',
                email:'sagar.gautam@123',
              }
              if(!user) {
                console.log('Invalid credentials');
                return null;
              }
              return user
              
           }
     })
  ],
});
