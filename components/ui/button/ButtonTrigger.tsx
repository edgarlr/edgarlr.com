import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import { useButtonListHover } from './use-button-hover'
import cn from 'classnames'
import s from './Button.module.css'

type ButtonTriggerProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export const ButtonTrigger: FC<ButtonTriggerProps> = ({
  className = '',
  ...props
}) => {
  const { repositionHover } = useButtonListHover()
  return (
    <button
      {...props}
      onMouseEnter={repositionHover}
      className={cn(s.buttonTrigger, className)}
    />
  )
}
