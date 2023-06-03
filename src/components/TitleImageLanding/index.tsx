import styles from './styles.module.css'
import Image from 'next/image'
import {
  FirstImageTitle,
  SecondImageTitle,
  ThreeImageTitle,
} from '../../../public/images/svg'
import React from 'react'

interface TitleImageLandingProps {
  firstPhrase: string
  secondPhrase?: string
  thirdPhrase?: string
  fourthPhrase?: string
  fifthPhrase?: string
  ftImage?: string
  sdImage?: string
  thImage?: string
}

const TitleImageLanding = (props: TitleImageLandingProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.title_content}>
        <h1 className={styles.titles}> {props.firstPhrase} </h1>
        <Image className={styles.image} src={FirstImageTitle} alt={'image'} />
      </div>
      <div className={styles.title_content}>
        <h1 className={styles.titles}> {props.secondPhrase} </h1>
        <Image className={styles.image} src={SecondImageTitle} alt={'image'} />
        <h1 className={styles.titles}> {props.thirdPhrase} </h1>
      </div>
      <div className={styles.title_content}>
        <h1 className={styles.titles}> {props.fourthPhrase} </h1>
        {props.fourthPhrase && (
          <Image className={styles.image} src={ThreeImageTitle} alt={'image'} />
        )}
      </div>

      <div className={styles.title_content_mobile}>
        <h1 className={styles.titles}> {props.firstPhrase} </h1>
        <Image className={styles.image} src={FirstImageTitle} alt={'image'} />
        <h1 className={styles.titles}> {props.secondPhrase} </h1>
      </div>

      <div className={styles.title_content_mobile}>
        <Image className={styles.image} src={SecondImageTitle} alt={'image'} />
        <h1 className={styles.titles}> {props.thirdPhrase} </h1>
      </div>

      <div className={styles.title_content_mobile}>
        <h1 className={styles.titles}> {props.fourthPhrase} </h1>
        {props.fourthPhrase && (
          <Image className={styles.image} src={ThreeImageTitle} alt={'image'} />
        )}
        <h1 className={styles.titles}> {props.fifthPhrase} </h1>
      </div>
    </div>
  )
}

export default TitleImageLanding
