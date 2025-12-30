const SupportIllustration = () => (
  <svg
    viewBox="0 0 800 500"
    className="w-full h-auto"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background abstract shapes */}
    <circle cx="700" cy="100" r="80" fill="#D0E7FF" />
    <ellipse cx="100" cy="400" rx="120" ry="60" fill="#E6F0FF" />
    <rect x="300" y="50" width="200" height="150" rx="40" fill="#D0E7FF" opacity="0.3" />

    {/* Desk */}
    <rect x="200" y="300" width="400" height="20" rx="10" fill="#E5E7EB" />

    {/* Laptop */}
    <rect x="300" y="220" width="200" height="100" rx="10" fill="#111827" />
    <rect x="310" y="230" width="180" height="80" rx="6" fill="#F9FAFB" />

    {/* Person */}
    {/* Head */}
    <circle cx="250" cy="200" r="30" fill="#FCD7B6" />
    {/* Hair */}
    <path
      d="M220 200 Q250 160 280 200 Q250 180 220 200 Z"
      fill="#2D2D2D"
    />
    {/* Body */}
    <rect x="220" y="230" width="60" height="80" rx="15" fill="#1E3A8A" />
    {/* Arms */}
    <rect x="200" y="240" width="40" height="15" rx="7" fill="#1E3A8A" />
    <rect x="280" y="240" width="40" height="15" rx="7" fill="#1E3A8A" />
    {/* Headset */}
    <circle cx="250" cy="200" r="32" fill="none" stroke="#2D2D2D" strokeWidth="3" />
    <rect x="250" y="215" width="3" height="20" fill="#2D2D2D" transform="rotate(20 250 215)" />

    {/* Speech bubbles */}
    <rect x="500" y="100" width="100" height="50" rx="15" fill="#D0E7FF" />
    <path d="M520 150 L510 160 L530 150 Z" fill="#D0E7FF" />

    <rect x="550" y="200" width="80" height="40" rx="12" fill="#E6F0FF" />
    <path d="M570 240 L565 250 L585 240 Z" fill="#E6F0FF" />

    {/* Envelope notification */}
    <rect x="180" y="100" width="50" height="35" rx="6" fill="#FBBF24" />
    <polygon points="180,100 205,125 230,100" fill="#FCD34D" />
    <circle cx="230" cy="100" r="10" fill="#EF4444" />
    <text x="226" y="104" fontSize="12" fill="#fff" fontWeight="bold">85</text>

    {/* Phone icon with arrows */}
    <rect x="620" y="50" width="40" height="40" rx="8" fill="#3B82F6" />
    <path d="M630 60 L650 80 M650 60 L630 80" stroke="#fff" strokeWidth="3" />

    {/* Password indicator */}
    <rect x="500" y="50" width="100" height="20" rx="8" fill="#D0E7FF" />
    <rect x="500" y="50" width="40" height="20" rx="8" fill="#3B82F6" />

    {/* Potted plant */}
    <rect x="150" y="270" width="20" height="30" rx="5" fill="#6B7280" />
    <ellipse cx="160" cy="260" rx="20" ry="15" fill="#34D399" />

  </svg>
);

export default SupportIllustration;
