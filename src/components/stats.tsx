'use client';
import { usePetContext } from '@/lib/hooks';

export default function Stats() {
  const { pets } = usePetContext();
  const onPremises = pets.filter((p) => p.checkedOutAt === null).length;
  const dueMeds = pets.reduce(
    (n, p) =>
      n +
      p.medications.filter(
        (m) => !m.givenAt && new Date(m.scheduledAt).getTime() <= Date.now(),
      ).length,
    0,
  );
  const events = pets.reduce((n, p) => n + p.events.length, 0);

  return (
    <section className="stats-strip">
      <div className="stat">
        <span className="stat-value">{onPremises}</span>
        <span className="stat-label">On premises</span>
      </div>
      <div className="stat">
        <span className="stat-value">{dueMeds}</span>
        <span className="stat-label">Meds due</span>
      </div>
      <div className="stat">
        <span className="stat-value">{events}</span>
        <span className="stat-label">Events today</span>
      </div>
    </section>
  );
}
