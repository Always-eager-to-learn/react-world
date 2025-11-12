import { X } from "lucide-react"
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
}

const CanvasWarning = ({ warning, setWarning, children }: Props) => {
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
    show: warning.showWarning,
    "pointer-events-none": !warning.showWarning,
  })

  useEffect(() => {
    if (warning.showWarning) {
      timer.current = setInterval(() => {
        setCurrentPosition((prev) => prev + 1)
        if (currentPosition === 100) {
          setCurrentPosition(0)
          clearWarning()
        }
      }, 40)
    } else if (!warning.showWarning && currentPosition !== 0) {
      setCurrentPosition(0)
      clearInterval(timer.current)
    }

    return () => {
      clearInterval(timer.current)
    }
  }, [warning.showWarning, currentPosition, clearWarning])

  return (
    <section
      className={`bg-[#F4E8C1] pb-4 pt-0 absolute bottom-2 right-0 rounded-2xl flex flex-col gap-3.5 drop-shadow-2xl ${styles} [transition:translate_450ms_ease-in-out,opacity_400ms_ease-in-out] -translate-y-10 overflow-hidden warning-section`}
    >
      <section className="flex flex-col gap-2.5">
        {warning.showWarning ? (
          <>
            <div
              className={`h-3 bg-[#414288] rounded-tl-2xl rounded-tr-2xl ${currentPosition < 98 ? "rounded-br-2xl" : ""}`}
              style={{ width: `${currentPosition}%` }}
            ></div>
            <section className="self-end px-2">
              <button
                className="hover:bg-[#363537] hover:text-[#fafafa] bg-transparent p-2.5 rounded-2xl outline-2 outline-transparent hover:outline-[#C2BBF0] active:scale-90 [transition:background-color_350ms_ease-in-out,color_350ms_ease-in-out,outline-color_300ms_ease-in-out,scale_200ms_ease-out]"
                onClick={clearWarning}
              >
                <X className="sm:w-7 sm:h-7 max-sm:w-5 max-sm:h-5" />
              </button>
            </section>
            {children}
          </>
        ) : null}
      </section>
    </section>
  )
}

export default memo(CanvasWarning)
