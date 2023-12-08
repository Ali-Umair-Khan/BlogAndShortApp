import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
    // ...add more providers here
  ],
  pages:{
    error: 'dashboard/auth/login'
  },
})
// export default NextAuth(authOptions)
export { handler as GET, handler as POST };












// This code sets up authentication using Next.js with NextAuth and various authentication providers (GitHub, Google, and Credentials). 
// Let's break it down step by step:


// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import User from "@/models/User";
// import connect from "@/utils/db";
// import bcrypt from "bcryptjs";

// // Importing necessary modules and components for authentication, user models, database connection, and password hashing.

// // Authentication Providers Setup:
// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       async authorize(credentials) {
//         //Check if the user exists.
//         await connect();

//         try {
//           const user = await User.findOne({
//             email: credentials.email,
//           });

//           if (user) {
//             const isPasswordCorrect = await bcrypt.compare(
//               credentials.password,
//               user.password
//             );
//             if (isPasswordCorrect) {
//               return user;
//             } else {
//               throw new Error("Wrong Credentials!");
//             }
//           } else {
//             throw new Error("User not found!");
//           }
//         } catch (err) {
//           throw new Error(err);
//         }
//       },
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   pages: {
//     error: "/dashboard/login",
//   },

// });

// export { handler as GET, handler as POST };

// Configuration for NextAuth using NextAuth function. It sets up different authentication providers like Credentials, GitHub, and Google.
// It also defines a custom error page (/dashboard/login) to redirect to in case of an authentication error.

// This is the authorization logic for the Credentials provider.
// It attempts to find a user based on the provided email and compares the hashed password using bcrypt.
// If the user is found and the password is correct, it returns the user.
// If the user is not found or the password is incorrect, it throws an error.

// Exporting the authentication handler functions for both GET and POST requests.
// In summary, this code sets up authentication using Next.js and NextAuth, with different providers like GitHub, Google, and Credentials (email/password). 
// It handles authentication logic, including checking user credentials and redirecting to a custom error page on authentication failure.

// The filename route.js inside the api/auth/[...nextauth] directory in a Next.js project suggests the usage of dynamic API routes with the catch-all parameter nextauth. 
// This structure is often used when implementing custom API routes related to authentication, especially when using authentication libraries like NextAuth.js.

// Here's what each part of the filename indicates:

// api/: It signifies that the file is an API route. Files inside the pages/api directory in a Next.js project are automatically treated as API routes.

// auth/: This part of the path is not inherently special to Next.js, but it's likely used for organizing API routes related to authentication. 
// It's common to place authentication-related routes under an auth subdirectory for better project organization.

// [...nextauth]: This is a dynamic route with the catch-all parameter nextauth. The ... syntax indicates that this route can match any number of segments,
//  and these segments will be available in the nextauth array when handling the request.

// route.js: This is the JavaScript file that contains the logic for handling the API route. It's where you would define the server-side code to handle incoming requests,
//  process authentication-related tasks, and send back responses.

