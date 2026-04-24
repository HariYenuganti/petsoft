type IconProps = {
  name: string;
  size?: number;
  stroke?: number;
  className?: string;
};

export default function Icon({ name, size = 16, stroke = 1.5, className }: IconProps) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: stroke,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  };

  switch (name) {
    case 'paw':
      return (
        <svg {...props}>
          <ellipse cx="7" cy="10" rx="1.6" ry="2.2" />
          <ellipse cx="12" cy="7.5" rx="1.6" ry="2.2" />
          <ellipse cx="17" cy="10" rx="1.6" ry="2.2" />
          <ellipse cx="5" cy="15" rx="1.5" ry="2" />
          <ellipse cx="19" cy="15" rx="1.5" ry="2" />
          <path d="M8 17.5c0-2 2-3 4-3s4 1 4 3-2 3.5-4 3.5-4-1.5-4-3.5z" />
        </svg>
      );
    case 'search':
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="6" />
          <path d="M20 20l-4-4" />
        </svg>
      );
    case 'bell':
      return (
        <svg {...props}>
          <path d="M6 16V11a6 6 0 0112 0v5" />
          <path d="M4 16h16" />
          <path d="M10 20a2 2 0 004 0" />
        </svg>
      );
    case 'plus':
      return (
        <svg {...props}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg {...props}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case 'arrow-in':
      return (
        <svg {...props}>
          <path d="M14 5l-6 7 6 7" />
          <path d="M8 12h13" />
        </svg>
      );
    case 'arrow-out':
      return (
        <svg {...props}>
          <path d="M10 5l6 7-6 7" />
          <path d="M3 12h13" />
        </svg>
      );
    case 'sun':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5 5l1.5 1.5M17 17l1.5 1.5M5 19l1.5-1.5M17 7l1.5-1.5" />
        </svg>
      );
    case 'moon':
      return (
        <svg {...props}>
          <path d="M20 14A8 8 0 019 4a8 8 0 1011 10z" />
        </svg>
      );
    case 'droplet':
      return (
        <svg {...props}>
          <path d="M12 3s6 7 6 12a6 6 0 01-12 0c0-5 6-12 6-12z" />
        </svg>
      );
    case 'bowl':
      return (
        <svg {...props}>
          <path d="M3 11h18l-2 8H5z" />
          <path d="M7 11c0-3 2-5 5-5s5 2 5 5" />
        </svg>
      );
    case 'pill':
      return (
        <svg {...props}>
          <rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-30 12 12)" />
          <path d="M9 6l6 12" transform="rotate(-30 12 12)" />
        </svg>
      );
    case 'nose':
      return (
        <svg {...props}>
          <path d="M12 4l6 10a4 4 0 01-12 0z" />
          <circle cx="10" cy="12" r="1" />
          <circle cx="14" cy="12" r="1" />
        </svg>
      );
    case 'close':
      return (
        <svg {...props}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case 'check':
      return (
        <svg {...props}>
          <path d="M4 12l5 5 11-11" />
        </svg>
      );
    case 'more':
      return (
        <svg {...props}>
          <circle cx="5" cy="12" r="1.2" />
          <circle cx="12" cy="12" r="1.2" />
          <circle cx="19" cy="12" r="1.2" />
        </svg>
      );
    case 'lock':
      return (
        <svg {...props}>
          <rect x="5" y="10" width="14" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 018 0v3" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...props}>
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path d="M4 10h16" />
          <path d="M8 3v4M16 3v4" />
        </svg>
      );
    case 'roster':
      return (
        <svg {...props}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M4 9h16" />
          <path d="M9 9v11" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg {...props}>
          <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5 5l4 4M15 15l4 4M5 19l4-4M15 9l4-4" />
        </svg>
      );
    default:
      return null;
  }
}
