import dateFormatter from '@lib/dateFormatter'
import s from './EntryHeader.module.css'

type Props = {
  title: string
  date: string
  author: string
}

const EntryHeader = ({ title, date }: Props) => {
  return (
    <div className={s.header}>
      <h2>{title}</h2>
      <div className={s.info}>
        <div className={s.date}>{dateFormatter(date)}</div>
      </div>
    </div>
  )
}

export default EntryHeader
