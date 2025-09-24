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
      d="M134.14 37.86a16 16 0 0 0-22.62 0L89.86 59.52a16 16 0 0 0 0 22.62L111.52 104a16 16 0 0 0 22.62 0l21.66-21.66a16 16 0 0 0 0-22.62zM218.63 93.37a16 16 0 0 0-22.62 0l-11 11a16 16 0 0 0 0 22.62l11 11a16 16 0 0 0 22.62 0l11-11a16 16 0 0 0 0-22.62zM56 152a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48zm0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32z"
    />
  </svg>
);

export default Logo;
