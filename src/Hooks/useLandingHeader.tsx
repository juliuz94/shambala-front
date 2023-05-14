import { useState } from 'react'
import { useRouter } from 'next/router'

export function UseLandingHeader() {

  const [openDrawer, setOpenDrawer]=useState(false)
  const route=useRouter()
  const [modal, setModal]=useState(false)

  const showDrawer=() => {
    setOpenDrawer(true)
  }

  const onCloseDrawer=() => {
    setOpenDrawer(false)
  }

  const loginNavigate=() => {
    route.push('/login')
  }

  const subscribeNavigate=() => {
    route.push('/Subscribe')
  }

  const handleContactUs=() => {
    setModal(true)
  }

  const homeNavigate=() => {
    route.push('/')
  }

  const closeModal=() => {
    setModal(false)
  }


  return {
    openDrawer,
    modal,
    onCloseDrawer,
    loginNavigate,
    subscribeNavigate,
    handleContactUs,
    homeNavigate,
    closeModal,
    showDrawer
  }
}