import prisma from "../../plugins/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || "fallback_secret";

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.adminUser.findUnique({
    where: { email, isActive: true, isDeleted: false },
  });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null;
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return { token, user: { id: user.id, email: user.email } };
};
