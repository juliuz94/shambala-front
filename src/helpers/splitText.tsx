export const splitTextIntoParagraph = (longString: string) => {
  const hasSpaces = /\r?\n/g.test(longString)

  if (!hasSpaces) {
    return <p>{longString}</p>
  }

  const paragraphsArray = longString.split(/\r?\n/g)

  return paragraphsArray.map((paragraph, index) => {
    if (paragraph === '') return null
    return <p key={index}>{paragraph}</p>
  })
}