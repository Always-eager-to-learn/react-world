import { useState } from "react"

const HeaderInputCanvas = () => {
  const defaultTitle = "Untitled Design"
  const [inputValue, setInputValue] = useState<string>(defaultTitle)

  return (
    <form
      className="flex flex-col gap-2 items-center"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
    >
      <label className="w-0 h-0 opacity-0 overflow-hidden">
        Name of the design frame
      </label>
      <input
        type="text"
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        onBlur={() => {
          if (inputValue === "") {
            setInputValue(defaultTitle)
          }
        }}
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
          if (inputValue === defaultTitle) {
            e.target.select()
          }
        }}
        onKeyDownCapture={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            ;(e.target as HTMLElement).blur()
          }
        }}
        className="text-xl outline-2 outline-transparent focus:outline-[#fafafa] transition-[outline-color] duration-300 ease-out text-center py-0.5 rounded-full text-[#fafafa]"
      />
    </form>
  )
}

export default HeaderInputCanvas
