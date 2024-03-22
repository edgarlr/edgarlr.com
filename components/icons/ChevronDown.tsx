import { ComponentPropsWithRef } from "react"

const ChevronDown = (props: ComponentPropsWithRef<"svg">) => {
  return (
    <svg width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}><path fillRule="evenodd" clipRule="evenodd" d="M5.293 8.293a1 1 0 0 1 1.414 0L12 13.586l5.293-5.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414Z"></path></svg>
  )
}

export default ChevronDown
