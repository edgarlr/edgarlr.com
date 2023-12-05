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
        <time dateTime={new Date(date).toJSON()} className={s.date}>
          {dateFormatter(date)}
        </time>
      </div>
    </div>
  )
}

export default EntryHeader
