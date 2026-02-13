import Image from 'next/image';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center gap-10 bg-gradient-to-br from-primary via-primary/90 to-accent/80 xl:flex-row"
    >
      <div className="relative isolate before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:bg-white/30 before:translate-x-[-16px] before:translate-y-[16px] before:shadow-[0_10px_28px_rgba(0,0,0,0.08)] before:z-[-2] after:content-[''] after:absolute after:inset-0 after:rounded-2xl after:bg-white/50 after:translate-x-[-8px] after:translate-y-[8px] after:shadow-[0_12px_30px_rgba(0,0,0,0.12)] after:z-[-1]">
        <Image
          src="/pet-card-preview.png"
          alt="Preview of PetSoft"
          width={519}
          height={472}
          className="rounded-2xl ring-1 ring-black/5 shadow-[0_22px_44px_rgba(15,23,42,0.14)]"
        />
      </div>

      <div>
        <Logo />
        <h1 className="text-5xl font-semibold my-6 max-w-[500px] ">
          Manage your <span className="font-extrabold">pet daycare</span> with
          ease
        </h1>
        <p className="text-2xl font-medium max-w-[600px]">
          Use PetSoft to easily keep track of your pets with ease. Get lifetime
          access for $499.
        </p>
        <div className="mt-10 space-x-3">
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
