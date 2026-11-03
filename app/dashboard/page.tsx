import { Suspense } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function DashboardContent() {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/dashboard");
  }
  return <h1>Welcome, {session.user?.name}</h1>;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<p>Loading dashboard…</p>}>
      <DashboardContent />
    </Suspense>
  );
}
