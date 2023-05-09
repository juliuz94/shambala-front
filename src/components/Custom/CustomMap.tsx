interface Props<T> {
  data: T[]
  renderItem: (item: T) => JSX.Element
  className: string
  // direction: 'row' | 'column'
}

export function CustomMap<T>(props: Props<T>) {
  const {data, renderItem, className}=props
  return (
    <div className={className} >
      {data.map((item: T) => {
        return renderItem(item)
      })}
    </div >
  )
}