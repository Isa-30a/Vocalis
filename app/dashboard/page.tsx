import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AppHeader } from "@/components/layout/AppHeader";
import { TeamCard } from "@features/equipo/components/TeamCard";
import { ServiceHero } from "@features/inicio/components/ServiceHero";
import { Welcome } from "@features/inicio/components/Welcome";
import { getHomeData } from "@features/inicio/data/home";
import { SetlistCard } from "@features/setlists/components/SetlistCard";
import { formatTotalMinutes } from "@features/setlists/utils";
import { getFirstName } from "@/lib/user";

async function DashboardContent() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const firstName = getFirstName(session.user);
  const homeData = await getHomeData();
  const totalMinutes = formatTotalMinutes(homeData.totalDurationSeconds);

  return (
    <div className="min-h-screen">
      <AppHeader user={session.user} />

      <main
        id="contenido"
        className="mx-auto w-full max-w-3xl px-4 pb-12 sm:px-6"
      >
        <Welcome name={firstName} />

        <ServiceHero
          director={homeData.director}
          serviceLabel={homeData.setlist?.serviceLabel ?? "Próximo servicio"}
          itemCount={homeData.setlistItems.length}
          totalMinutes={totalMinutes}
        />

        <SetlistCard
          items={homeData.setlistItems}
          totalMinutes={totalMinutes}
        />

        <TeamCard
          members={homeData.members}
          rehearsal={homeData.rehearsal}
          invitePath={homeData.invitePath}
        />
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<p>Cargando dashboard…</p>}>
      <DashboardContent />
    </Suspense>
  );
}
