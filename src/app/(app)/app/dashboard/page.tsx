import ContentBlock from '@/components/content-block';
import Eyebrow from '@/components/eyebrow';
import PetButton from '@/components/pet-button';
import PetDetails from '@/components/pet-details';
import PetList from '@/components/pet-list';
import PrintButton from '@/components/print-button';
import PrintRunSheet from '@/components/print-run-sheet';
import RosterTabs from '@/components/roster-tabs';
import SearchForm from '@/components/search-form';
import Stats from '@/components/stats';
import { checkAuth, getPetsByUserId } from '@/lib/server-utils';

function headingForCount(n: number) {
  if (n === 0) return ['A blank ledger,', 'one quiet morning.'];
  if (n === 1) return ['One guest,', 'one quiet morning.'];
  return [`${n} guests,`, 'one quiet morning.'];
}

function today() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export default async function DashboardPage() {
  const session = await checkAuth();
  const pets = await getPetsByUserId(session.user.id);
  const onPremises = pets.filter((p) => p.checkedOutAt === null);
  const offPremises = pets.filter((p) => p.checkedOutAt !== null);
  const [line1, line2] = headingForCount(onPremises.length);

  return (
    <main className="py-8">
      <div className="page-header">
        <div>
          <Eyebrow>The roster &middot; {today()}</Eyebrow>
          <h1 className="page-title">
            {line1}
            <br />
            <span className="italic">{line2}</span>
          </h1>
          <p className="page-sub">
            All of today&rsquo;s guests on one screen. Pick a name to read the day so far.
          </p>
        </div>
        <Stats />
      </div>

      <div className="mb-4 flex items-center justify-between gap-4 flex-wrap">
        <RosterTabs onCount={onPremises.length} offCount={offPremises.length} />
        <div className="flex items-center gap-2">
          <PrintButton />
          <PetButton actionType="add" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 md:grid-rows-[45px_1fr] grid-rows-[45px_auto_auto] gap-4 md:h-[680px]">
        <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
          <SearchForm />
        </div>

        <div className="md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1 max-h-[500px] md:max-h-none">
          <ContentBlock className="p-0">
            <PetList />
          </ContentBlock>
        </div>

        <div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full min-h-[500px] md:min-h-0">
          <ContentBlock className="p-0">
            <PetDetails />
          </ContentBlock>
        </div>
      </div>

      {/* Print-only daily run sheet — hidden on screen, rendered when Print is triggered */}
      <PrintRunSheet pets={pets} />
    </main>
  );
}
