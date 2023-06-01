import type { SVGProps } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={1512}
    height={507}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M-1 105.497c59.398 0 68.312 24.507 109.14 24.507 49.741 0 73.609 24.303 109.14 24.303 35.531 0 61.772-36.124 109.14-36.124s46.909 50.247 109.14 50.247c62.23 0 77.398 55.699 109.14 55.699 31.741 0 31.752-19.147 109.14-19.147s54.712 46.181 109.14 46.181c54.427 0 30.987 24.13 109.14 24.13 78.152 0 78.152 36.358 109.139 36.358 22.461 0 70.941-10.292 110.941-10.292 64.79 0 50.79 41.636 107.34 41.636 56.55 0 49.67 46.12 109.14 46.12s73.18 37.601 109.15 37.601 36.08 80.022 109.14 80.022V-15H-1v120.497Z'
      fill='#FAFAFA'
    />
  </svg>
)

export default SvgComponent
