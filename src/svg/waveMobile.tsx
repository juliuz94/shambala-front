import * as React from 'react'

interface Props {
  width: number | string;
  height: number | string;
  fillColor?: string;
  className?: string;
}

const WaveMobile=(props: Props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.width}
    height={props.height}
    fill='none'
    style={{marginBottom: '-98px'}}
    className={props.className}
  >
    <path
      fill='#069507'
      d='M314.835 27.798c-20.783 5.583-40.907 15.59-61.633 21.658-29.523 8.651-60.268 9.174-89.745.202-28.645-8.697-58.347-29.91-86.652-40.688C51.704-.59 24.3-4.528 0 7.418V57h430V42.85c-36.717-20.104-76.545-25.309-115.165-15.052Z'
    />
  </svg >
)
export default WaveMobile