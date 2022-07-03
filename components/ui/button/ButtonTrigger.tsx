import { useButtonListHover } from './use-button-hover'
import cn from 'classnames'
import s from './Button.module.css'
import { ArrowUpRight } from '@components/icons/ArrowUpRight'

type AsProp<C extends React.ElementType> = {
  as?: C
}

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P)

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = Record<string, never>
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

type ButtonProps<C extends React.ElementType> = PolymorphicComponentProp<
  C,
  { className?: string; withIcon?: boolean }
>
export const ButtonTrigger = <C extends React.ElementType = 'button'>({
  className = '',
  as,
  children,
  withIcon,
  ...props
}: ButtonProps<C>) => {
  const { repositionHover } = useButtonListHover()

  const Comp = as ?? 'button'

  return (
    <Comp
      {...props}
      onMouseEnter={repositionHover}
      className={cn(s.buttonTrigger, className)}
    >
      {children}
      {withIcon && (
        <span className={s.arrowIcon}>
          <ArrowUpRight width={14} height={14} />
        </span>
      )}
    </Comp>
  )
}
