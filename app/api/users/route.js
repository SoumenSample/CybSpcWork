import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth-options";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";

const createUserSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["client", "employee"]),
});

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "admin") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();

  const users = await User.find({}, { passwordHash: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return Response.json({ users }, { status: 200 });
}

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "admin") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createUserSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  await connectToDatabase();

  const email = parsed.data.email.toLowerCase().trim();
  const existing = await User.findOne({ email });

  if (existing) {
    return Response.json({ error: "User already exists" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  const created = await User.create({
    name: parsed.data.name.trim(),
    email,
    passwordHash,
    role: parsed.data.role,
    isActive: true,
    createdBy: session.user.id,
  });

  return Response.json(
    {
      user: {
        id: created._id.toString(),
        name: created.name,
        email: created.email,
        role: created.role,
        isActive: created.isActive,
      },
    },
    { status: 201 }
  );
}
