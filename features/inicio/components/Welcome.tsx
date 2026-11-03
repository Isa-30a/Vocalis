export function Welcome({ name }: { name: string }) {
  return (
    <section aria-labelledby="welcome-title" className="pt-8 sm:pt-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
        Tu equipo de alabanza
      </p>
      <h1
        id="welcome-title"
        className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        Hola, {name}
      </h1>
      <p className="mt-2 max-w-md text-sm text-base-content/60 sm:text-base">
        Aquí tienes lo esencial para el próximo servicio.
      </p>
    </section>
  );
}
