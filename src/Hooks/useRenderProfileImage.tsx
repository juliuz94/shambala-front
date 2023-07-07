const useRenderProfileImage = (
  image: any,
  firstName: any,
  lastName: any,
  styles: any
) => {
  const renderProfileImage = () => {
    if (image) {
      return <img src={image} className={styles} alt='profile' />
    } else {
      const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`
      return <div className={styles}>{initials}</div>
    }
  }

  return {
    renderProfileImage,
  }
}

export default useRenderProfileImage
