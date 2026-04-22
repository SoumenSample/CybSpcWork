import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const email = parsed.data.email.trim().toLowerCase();
        const password = parsed.data.password;

        await connectToDatabase();

        let user = await User.findOne({ email });

        // Bootstrap the first admin when no admin exists and bootstrap creds are used.
        if (!user) {
          const adminCount = await User.countDocuments({ role: "admin" });
          const canBootstrap =
            adminCount === 0 &&
            email === (process.env.ADMIN_EMAIL || "").toLowerCase() &&
            password === process.env.ADMIN_PASSWORD;

          if (canBootstrap) {
            const passwordHash = await bcrypt.hash(password, 12);
            user = await User.create({
              name: process.env.ADMIN_NAME || "Admin",
              email,
              passwordHash,
              role: "admin",
              isActive: true,
            });
          }
        }

        if (!user || !user.isActive) {
          return null;
        }

        const matches = await bcrypt.compare(password, user.passwordHash);
        if (!matches) {
          return null;
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
