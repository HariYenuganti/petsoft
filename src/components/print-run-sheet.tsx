import { PetWithRelations } from '@/lib/types';

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function fmtTime(d: Date | string | null) {
  if (!d) return '—';
  return new Date(d).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function petPlate(id: string) {
  return 'PS-' + id.slice(-4).toUpperCase();
}

type Props = { pets: PetWithRelations[] };

export default function PrintRunSheet({ pets }: Props) {
  const onPremises = pets.filter((p) => p.checkedOutAt === null);
  const dayStart = startOfToday().getTime();

  // Flatten medications for on-premises pets scheduled today.
  const meds = onPremises
    .flatMap((p) =>
      p.medications
        .filter(
          (m) =>
            new Date(m.scheduledAt).getTime() >= dayStart ||
            (m.givenAt && new Date(m.givenAt).getTime() >= dayStart),
        )
        .map((m) => ({ ...m, petName: p.name, petPlate: petPlate(p.id) })),
    )
    .sort(
      (a, b) =>
        new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
    );

  const today = new Date();
  const dateLong = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section className="run-sheet hidden">
      <header className="run-sheet-header">
        <div>
          <p className="eyebrow">Kennelry &middot; daily run sheet</p>
          <h1 className="run-sheet-title">{dateLong}</h1>
        </div>
        <p className="run-sheet-meta">
          {onPremises.length} guests on premises &middot; {meds.length} doses scheduled
        </p>
      </header>

      <h2 className="run-sheet-section-title">On premises today</h2>
      <table className="run-sheet-table">
        <thead>
          <tr>
            <th>Plate</th>
            <th>Guest</th>
            <th>Owner</th>
            <th>Age</th>
            <th>In</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {onPremises.length === 0 && (
            <tr>
              <td colSpan={6} className="run-sheet-empty">
                No guests on the floor.
              </td>
            </tr>
          )}
          {onPremises.map((p) => {
            const checkin = p.events.slice().reverse().find((e) => e.kind === 'checkin');
            return (
              <tr key={p.id}>
                <td className="run-sheet-mono">{petPlate(p.id)}</td>
                <td className="run-sheet-name">{p.name}</td>
                <td>{p.ownerName}</td>
                <td>{p.age ? `${p.age} yr` : '—'}</td>
                <td className="run-sheet-mono">
                  {checkin ? fmtTime(checkin.time) : '—'}
                </td>
                <td className="run-sheet-notes">{p.notes || '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2 className="run-sheet-section-title">Medication schedule</h2>
      <table className="run-sheet-table">
        <thead>
          <tr>
            <th>Scheduled</th>
            <th>Guest</th>
            <th>Medication</th>
            <th>Dose</th>
            <th>Status</th>
            <th>Given by</th>
          </tr>
        </thead>
        <tbody>
          {meds.length === 0 && (
            <tr>
              <td colSpan={6} className="run-sheet-empty">
                No medications scheduled.
              </td>
            </tr>
          )}
          {meds.map((m) => (
            <tr key={m.id}>
              <td className="run-sheet-mono">{fmtTime(m.scheduledAt)}</td>
              <td className="run-sheet-name">{m.petName}</td>
              <td>{m.name}</td>
              <td className="run-sheet-mono">{m.dose}</td>
              <td className="run-sheet-mono">
                {m.givenAt ? `Given ${fmtTime(m.givenAt)}` : 'Pending'}
              </td>
              <td>{m.givenBy || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="run-sheet-footer">
        <span>Kennelry &middot; est. &rsquo;24</span>
        <span>Printed {today.toLocaleString('en-US')}</span>
      </footer>
    </section>
  );
}
