import Twitter from '@components/icons/Twitter'
import IconLink from '@components/ui/IconLink/IconLink'
import { TwitterURL } from '@lib/constants'
import dateFormatter from '@lib/dateFormatter'
import s from './EntryHeader.module.css'

type Props = {
  title: string
  date: string
  author: string
}

const EntryHeader = ({ title, date, author }: Props) => {
  return (
    <div className={s.header}>
      <h2>{title}</h2>
      <div className={s.info}>
        <IconLink
          href={TwitterURL}
          label={author}
          ariaLabel="Link to author's twitter"
        >
          <Twitter width="20" height="20" />
        </IconLink>
        <div className={s.date}>{dateFormatter(date)}</div>
      </div>
    </div>
  )
}

export default EntryHeader
