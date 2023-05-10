import React from 'react'

interface Props {
  width: number | string;
  height: number | string;
  fillColor?: string;
  className?: string;
}

function Waves(props: Props) {
  return (
    <svg width={props.width} height={props.height} viewBox='0 0 1512 79' fill='none'
         xmlns='http://www.w3.org/2000/svg' style={{marginBottom: '-6px'}}
         className={props.className}
    >
      <g clipPath='url(#clip0_442_12307)' >
        <path
          d='M1097.41 53.7074C1022.59 58.4087 950.14 66.8351 875.527 71.9459C769.244 79.2308 658.562 79.6709 552.446 72.1158C449.324 64.7917 342.396 46.928 240.499 37.8524C150.134 29.8006 51.4749 26.485 -36 36.5453L-36 78.2985L1512 78.2983L1512 66.3819C1379.82 49.4532 1236.44 45.0699 1097.41 53.7074Z'
          fill={props.fillColor} />
      </g >
      <defs >
        <clipPath id='clip0_442_12307' >
          <rect width='1548' height='78.0001' fill='white' transform='translate(1512 78.2983) rotate(180)' />
        </clipPath >
      </defs >
    </svg >
  )
}

export default Waves