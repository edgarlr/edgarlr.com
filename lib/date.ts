export default function dateFormatter(dateToformat: string, options?: Intl.DateTimeFormatOptions) {
  const date = new Date(dateToformat)
  const year = date.getFullYear()

  const actualYear = new Date().getFullYear()



  return date.toLocaleDateString('default', {
    ...options,
    year: year < actualYear ? 'numeric' : undefined
  })
}
