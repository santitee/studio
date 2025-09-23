import type { SVGProps } from 'react';

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width="1em"
    height="1em"
    {...props}
  >
    <path fill="none" d="M0 0h256v256H0z" />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
      d="M168 200h48a8 8 0 0 0 8-8V64a8 8 0 0 0-8-8H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h48m88-144-56 56"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
      d="M88 200h80V104a40 40 0 0 0-80 0z"
    />
  </svg>
);

export default Logo;
