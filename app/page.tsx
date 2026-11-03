import { AppHeader } from "@/src/components/layout/AppHeader";
import { TeamCard } from "@features/equipo/components/TeamCard";
import { ServiceHero } from "@features/inicio/components/ServiceHero";
import { Welcome } from "@features/inicio/components/Welcome";
import { homeData } from "@features/inicio/data/home";
import { SetlistCard } from "@features/setlists/components/SetlistCard";
import { formatTotalMinutes } from "@features/setlists/utils";

export default function HomePage() {
  const totalMinutes = formatTotalMinutes(homeData.totalDurationSeconds);

  return (
    <div className="min-h-screen">
      <AppHeader user={homeData.user} />

      <main
        id="contenido"
        className="mx-auto w-full max-w-3xl px-4 pb-12 sm:px-6"
      >
        <Welcome name={homeData.user.name} />

        <ServiceHero
          director={homeData.director}
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
