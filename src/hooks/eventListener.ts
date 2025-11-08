import { useEffect, type RefObject } from "react"

interface Props {
  ref: RefObject<HTMLElement | null>
  handler: () => void
  isExpanded: boolean
}

const useCloseEventListener = ({ ref, handler, isExpanded }: Props) => {
  useEffect(() => {
    function performAction(event: MouseEvent | TouchEvent) {
      if (
        ref.current !== null &&
        ref.current.contains(event.target as Node) === false &&
        isExpanded
      ) {
        console.log("RUnning event")
        console.log(event.target)
        // handler()
      }
    }

    document.addEventListener("click", performAction)
    document.addEventListener("touchstart", performAction)

    return () => {
      document.removeEventListener("click", performAction)
      document.removeEventListener("touchstart", performAction)
    }
  }, [ref, handler, isExpanded])
}

export { useCloseEventListener }
