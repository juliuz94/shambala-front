import Portal from './Portal'

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export default function CustomModal({children, onClose, isOpen}: Props) {
  return (
    <>
      {isOpen && (
        <Portal >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            zIndex: 1,
            backgroundColor: 'rgba(0,0,0, 0.5',
            position: 'fixed',
            top: 0,
            left: 0
          }} >
            <div className='modal-content' >
              <button className='modal-close' onClick={onClose} >
                Cerrar
              </button >
              {children}
            </div >
          </div >
        </Portal >
      )}
    </>
  )
}