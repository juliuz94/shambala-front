import * as React from 'react'
import { SVGProps } from 'react'

const Linkedin=(props: SVGProps<SVGSVGElement>) => (
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
        d='M22.223.298H1.772C.792.298 0 1.072 0 2.028v20.536c0 .956.792 1.734 1.772 1.734h20.451c.98 0 1.777-.778 1.777-1.73V2.029c0-.956-.797-1.73-1.777-1.73ZM7.12 20.75H3.558V9.294H7.12V20.75ZM5.34 7.733a2.064 2.064 0 1 1 0-4.125 2.063 2.063 0 0 1 0 4.125ZM20.451 20.75h-3.558V15.18c0-1.326-.024-3.037-1.852-3.037-1.851 0-2.133 1.448-2.133 2.943v5.663H9.356V9.294h3.413v1.565h.047c.473-.9 1.636-1.851 3.365-1.851 3.605 0 4.27 2.372 4.27 5.456v6.286Z'
      />
    </g >
    <defs >
      <clipPath id='a' >
        <path fill='#fff' d='M0 .298h24v24H0z' />
      </clipPath >
    </defs >
  </svg >
)
export default Linkedin