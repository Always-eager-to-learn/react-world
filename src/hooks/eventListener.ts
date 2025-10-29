import { useEffect, type RefObject } from "react"

const useCloseEventListener = <T extends HTMLElement>({
  ref,
  handler,
}: {
  ref: RefObject<T>
  handler: () => void
}) => {
  useEffect(() => {
    function performAction(event: MouseEvent | TouchEvent) {
      if (ref.current !== null && !ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    document.addEventListener("click", performAction)
    document.addEventListener("touchstart", performAction)
  }, [ref, handler])
}

export { useCloseEventListener }
