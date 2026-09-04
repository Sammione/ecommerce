import Link from 'next/link';

interface LogoProps {
  className?: string;
  light?: boolean;
}

export default function Logo({ className = '', light = false }: LogoProps) {
  const primaryColor = light ? '#FAF9F6' : '#0B132B';
  const accentColor = light ? '#E6E6FA' : '#4B2E83';

  return (
    <Link href="/" className={`inline-flex flex-col items-start group ${className}`} aria-label="Ifẹ́mi Lifestyle Admin">
      <div className="flex items-center tracking-tight select-none">
        <span 
          className="font-playfair font-black text-xl lowercase"
          style={{ color: primaryColor, letterSpacing: '-0.03em' }}
        >
          ifẹ́mi
        </span>
        <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 bg-[var(--color-brand-purple)] text-white uppercase tracking-wider rounded">
          Admin
        </span>
      </div>
      <span 
        className="text-[7px] uppercase tracking-[0.45em] font-medium mt-[-2px]"
        style={{ color: accentColor }}
      >
        lifestyle
      </span>
    </Link>
  );
}
