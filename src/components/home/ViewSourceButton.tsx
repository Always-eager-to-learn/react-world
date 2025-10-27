import { Code } from "lucide-react"

interface Props {
  shouldDisplayText?: boolean
}

const ViewSourceButton = ({ shouldDisplayText = false }: Props) => {
  return (
    <a
      href="https://github.com/Always-eager-to-learn/react-world"
      className={`bg-[#30343F] text-[#f4f4f4] flex gap-3.5 justify-center items-center ${shouldDisplayText ? `px-5 py-3.5 rounded-2xl` : `p-4 rounded-full`} hover:bg-[#f4f4f4] hover:text-[#30343f] outline-2 outline-transparent hover:outline-[#30343f] [transition:background-color_300ms_ease-in-out,color_300ms_ease-in,outline-color_300ms_ease-in-out]`}
      target="_blank"
    >
      {shouldDisplayText ? <p className="text-base">View Source Code</p> : null}
      <Code size={28} />
    </a>
  )
}

export default ViewSourceButton
