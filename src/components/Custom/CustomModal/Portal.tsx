import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

interface Props {
  children: React.ReactNode;
}

export default function Portal({children}: Props) {
  const [isMounted, setIsMounted]=useState(false)
  const [portalNode, setPortalNode]=useState<HTMLDivElement | null>(null)

  useEffect(() => {
    setIsMounted(true)

    const node=document.createElement('div')
    document.body.appendChild(node)
    setPortalNode(node)

    return () => {
      setIsMounted(false)
      document.body.removeChild(node)
    }
  }, [])

  return isMounted && portalNode ? ReactDOM.createPortal(children, portalNode) : null
}