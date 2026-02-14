import Image from 'next/image';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 sm:gap-8 lg:gap-10 bg-gradient-to-br from-primary via-primary/90 to-accent/80 lg:flex-row">
      <div className="relative isolate w-full max-w-[400px] sm:max-w-[519px] before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:bg-white/30 before:translate-x-[-8px] before:translate-y-[8px] sm:before:translate-x-[-16px] sm:before:translate-y-[16px] before:shadow-[0_10px_28px_rgba(0,0,0,0.08)] before:z-[-2] after:content-[''] after:absolute after:inset-0 after:rounded-2xl after:bg-white/50 after:translate-x-[-4px] after:translate-y-[4px] sm:after:translate-x-[-8px] sm:after:translate-y-[8px] after:shadow-[0_12px_30px_rgba(0,0,0,0.12)] after:z-[-1]">
        <Image
          src="/pet-card-preview.png"
          alt="Preview of PetSoft"
          width={519}
          height={472}
          className="rounded-2xl ring-1 ring-black/5 shadow-[0_22px_44px_rgba(15,23,42,0.14)] w-full h-auto"
        />
      </div>

      <div className="text-center lg:text-left px-4">
        <Logo />
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold my-4 sm:my-6 max-w-[500px] mx-auto lg:mx-0">
          Manage your <span className="font-extrabold">pet daycare</span> with
          ease
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl font-medium max-w-[600px] mx-auto lg:mx-0">
          Use PetSoft to easily keep track of your pets with ease. Get lifetime
          access for $499.
        </p>
        <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:space-x-3 max-w-xs mx-auto lg:mx-0">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button asChild variant="secondary" className="w-full sm:w-auto">
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
