import { getSession } from "@/lib/supabase";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  console.log(" session: ", session);
  // redirect routes
  if (!session?.user) {
    redirect("/login");
  }
  return <>{children}</>;
}
