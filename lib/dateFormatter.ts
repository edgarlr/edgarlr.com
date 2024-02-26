export default function dateFormatter(dateToformat: string, { month }: { month: 'short' | 'long' }) {
  const date = new Date(dateToformat)
  const year = date.getFullYear()

  const actualYear = new Date().getFullYear()

  if (year < actualYear)
    return date.toLocaleDateString('default', {
      month,
      day: 'numeric',
      year: 'numeric',
    })

  return date.toLocaleDateString('default', {
    month,
    day: 'numeric',
  })
}
