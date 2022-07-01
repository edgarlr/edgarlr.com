import { createContext, MouseEventHandler, useContext } from 'react'

type ButtonListHoverContextProps = {
  repositionHover: MouseEventHandler<HTMLButtonElement>
}

export const ButtonListHoverContext = createContext<ButtonListHoverContextProps | null>(
  null
)

export const useButtonListHover = () => {
  const context = useContext(ButtonListHoverContext)

  if (!context) {
    throw new Error(
      `ButtonListHightlight compound components cannot be rendered outside the ButtonList component`
    )
  }

  return context
}
