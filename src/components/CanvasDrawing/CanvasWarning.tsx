import { CircleAlert, X } from "lucide-react"
import type { WarningCanvas } from "../../types/CanvasType"
import {
  type ReactNode,
  memo,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react"
import clsx from "clsx"

interface Props {
  warning: WarningCanvas
  setWarning: (val: WarningCanvas) => void
  children: ReactNode
  isMounted: boolean
  setIsMounted: (val: boolean) => void
  delayTime: number
  sliderColor: string
}

const CanvasWarning = ({
  warning,
  setWarning,
  children,
  isMounted,
  setIsMounted,
  delayTime,
  sliderColor,
}: Props) => {
  const clearWarning = useCallback(
    function () {
      setWarning({
        showWarning: false,
        warningMessage: "",
        warningType: { type: null },
      })

      clearInterval(timer.current)
    },
    [setWarning],
  )

  const [currentPosition, setCurrentPosition] = useState(0)
  const timer = useRef<number | undefined>(undefined)
  const styles = clsx({
    show: isMounted,
    "pointer-events-none": !warning.showWarning,
  })

  useEffect(() => {
    if (warning.showWarning && isMounted) {
      timer.current = setInterval(() => {
        setCurrentPosition((prev) => prev + 1)
        if (currentPosition === 100) {
          setCurrentPosition(0)
          setIsMounted(false)
        }
      }, delayTime)
    } else if (!warning.showWarning && currentPosition !== 0) {
      setCurrentPosition(0)
      clearInterval(timer.current)
    }

    return () => {
      clearInterval(timer.current)
    }
  }, [warning.showWarning, currentPosition, setIsMounted, isMounted, delayTime])

  useEffect(() => {
    let timer: number | null = null
    if (!isMounted) {
      timer = setTimeout(() => {
        clearWarning()
      }, 500)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [isMounted, clearWarning])

  return (
    <section
      className={`pb-4 pt-0 fixed z-2 bottom-2 right-0 rounded-2xl drop-shadow-2xl ${styles} -translate-y-10 warning-section overflow-hidden -bg-linear-210 from-[#F5D6BA] to-[hsl(100,97%,98%)]`}
    >
      <section>
        {warning.showWarning ? (
          <>
            <div
              className={`h-3 ${sliderColor} rounded-tl-2xl rounded-tr-2xl ${currentPosition < 98 ? "rounded-br-2xl" : ""}`}
              style={{ width: `${currentPosition}%` }}
            ></div>
            <section className="px-2 py-2 grid grid-cols-[0.2fr_3fr_0.2fr] grid-rows-[auto]">
              <div>
                <div className="px-3 py-2.5 bg-[#fafafa] rounded-full drop-shadow-[2px_3px_7px_#B4A0E5]">
                  <CircleAlert className="sm:w-8 sm:h-8 max-sm:w-5 max-sm:h-5" />
                </div>
              </div>
              <button
                className="hover:bg-[#363537] hover:text-[#fafafa] bg-transparent p-2.5 rounded-2xl outline-2 outline-transparent hover:outline-[#C2BBF0] active:scale-90 [transition:background-color_350ms_ease-in-out,color_350ms_ease-in-out,outline-color_300ms_ease-in-out,scale_200ms_ease-out] col-start-3 self-start"
                onClick={() => setIsMounted(false)}
              >
                <X className="sm:w-7 sm:h-7 max-sm:w-5 max-sm:h-5" />
              </button>
              <section className="col-start-2 row-start-1">{children}</section>
            </section>
          </>
        ) : null}
      </section>
    </section>
  )
}

export default memo(CanvasWarning)
