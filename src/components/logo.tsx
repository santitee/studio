import type { SVGProps } from 'react';

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width="1em"
    height="1em"
    shapeRendering="geometricPrecision"
    {...props}
  >
    <path
      fill="currentColor"
      d="M194.63 218.63a16 16 0 0 1-22.62 0L37.37 84a16 16 0 0 1 0-22.63L49 49.69a16 16 0 0 1 22.63 0l134.62 134.62a16 16 0 0 1 0 22.62z"
    />
    <circle cx="80" cy="176" r="24" fill="currentColor" />
    <rect
      x="172"
      y="44"
      width="40"
      height="40"
      rx="8"
      transform="rotate(45 192 64)"
      fill="currentColor"
    />
  </svg>
);

export default Logo;
