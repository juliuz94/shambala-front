import * as React from 'react'
import { SVGProps } from 'react'

const Github=(props: SVGProps<SVGSVGElement>) => (
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
        fillRule='evenodd'
        d='M12 .298C5.372.298 0 5.68 0 12.318a12.02 12.02 0 0 0 8.207 11.406c.6.11.818-.26.818-.58 0-.284-.01-1.042-.015-2.044-3.339.726-4.043-1.611-4.043-1.611-.545-1.39-1.332-1.76-1.332-1.76-1.09-.744.083-.73.083-.73 1.203.085 1.837 1.24 1.837 1.24 1.07 1.835 2.809 1.305 3.492.998.11-.777.42-1.306.763-1.606-2.664-.303-5.466-1.335-5.466-5.941 0-1.312.468-2.386 1.235-3.226-.124-.303-.535-1.526.117-3.18 0 0 1.008-.324 3.3 1.232A11.477 11.477 0 0 1 12 6.11c1.02.005 2.046.138 3.005.405C17.295 4.96 18.3 5.283 18.3 5.283c.655 1.655.243 2.878.12 3.181.768.84 1.234 1.914 1.234 3.226 0 4.618-2.807 5.634-5.48 5.932.431.37.814 1.104.814 2.226 0 1.605-.014 2.902-.014 3.296 0 .322.216.696.825.578A12.022 12.022 0 0 0 24 12.32c0-6.64-5.374-12.02-12-12.02Z'
        clipRule='evenodd'
      />
    </g >
    <defs >
      <clipPath id='a' >
        <path fill='#fff' d='M0 .298h24v24H0z' />
      </clipPath >
    </defs >
  </svg >
)
export default Github