export function LandasLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Landas AI logo">
      <rect width="48" height="48" rx="12" fill="#0A0A0A" />
      <circle cx="24" cy="24" r="13.5" stroke="white" strokeWidth="2.5" opacity="0.3" />
      <circle cx="17.5" cy="30.5" r="1.7" fill="white" opacity="0.85" />
      <circle cx="13.5" cy="34.5" r="1.3" fill="white" opacity="0.5" />
      <path d="M24 24 L33 15" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
      <path d="M27.6 14.6 L33 15 L33.4 20.4" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="24" cy="24" r="3.6" fill="white" />
    </svg>
  );
}
