import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';
import PetContextProvider from '@/contexts/pet-context-provider';
import SearchContextProvider from '@/contexts/search-context-provider';
import { Toaster } from 'sonner';
import { checkAuth, getPetsByUserId } from '@/lib/server-utils';

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await checkAuth();
  const pets = await getPetsByUserId(session.user.id);
  return (
    <>
      <div className="flex flex-col max-w-[1200px] mx-auto px-4 sm:px-6 min-h-screen">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>
      <Toaster position="top-right" />
    </>
  );
}
