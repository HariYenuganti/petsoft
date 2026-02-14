import Logo from '@/components/logo';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-4 sm:gap-y-5 justify-center items-center min-h-screen px-4">
      <Logo />
      {children}
    </div>
  );
}
