import {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  MouseEvent,
  useRef,
  useState,
} from 'react'
import { ButtonListHoverContext } from './use-button-hover'
import s from './Button.module.css'
import cn from 'classnames'

type ButtonListProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  className?: string
}

export const ButtonList: FC<ButtonListProps> = ({
  children,
  className,
  ...props
}) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  const [buttonBoundingBox, setButtonBoundingBox] = useState<DOMRect | null>(
    null
  )
  const [wrapperBoundingBox, setWrapperBoundingBox] = useState<DOMRect | null>(
    null
  )
  const [isHoveredFromNull, setIsHoveredFromNull] = useState<boolean>(true)

  const buttonListRef = useRef<HTMLDivElement>(null)

  const repositionHover = (e: MouseEvent<HTMLElement>) => {
    if (!buttonListRef?.current || !e.target) return
    const target = e.target as HTMLElement
    setButtonBoundingBox(target.getBoundingClientRect())
    setHoveredButton(target.id)
    setWrapperBoundingBox(buttonListRef.current.getBoundingClientRect())
    setIsHoveredFromNull(!hoveredButton)
  }

  const getButtonStyles = () => {
    if (!buttonBoundingBox || !wrapperBoundingBox) return {}
    return {
      transitionDuration: isHoveredFromNull ? '0ms' : '150ms',
      opacity: hoveredButton ? 1 : 0,
      width: `${buttonBoundingBox.width}px`,
      transform: `translate(${
        buttonBoundingBox.left - wrapperBoundingBox.left
      }px) scale(${hoveredButton ? '1' : '0.95'})`,
    }
  }
  return (
    <ButtonListHoverContext.Provider value={{ repositionHover }}>
      <div
        {...props}
        ref={buttonListRef}
        onMouseLeave={() => setHoveredButton(null)}
        className={cn(s.buttonList, className)}
      >
        <div className={s.buttonHover} style={{ ...getButtonStyles() }} />
        {children}
      </div>
    </ButtonListHoverContext.Provider>
  )
}
