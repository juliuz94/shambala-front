import * as React from 'react'
import { SVGProps } from 'react'

const Facebook=(props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={24}
    height={25}
    fill='none'
    {...props}
  >
    <g clipPath='url(#a)' >
      <path
        fill='#88E189'
        d='M24 12.298c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.855v-8.386H7.078v-3.469h3.047V9.655c0-3.008 1.792-4.67 4.533-4.67 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.875v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.253 24 18.288 24 12.298Z'
      />
    </g >
    <defs >
      <clipPath id='a' >
        <path fill='#fff' d='M0 .298h24v24H0z' />
      </clipPath >
    </defs >
  </svg >
)
export default Facebook