const TestimonialComponent = () => {
    return (
        <div className="flex flex-col items-center p-4 gap-6">
            <div className="w-96">
                <div className="bg-cyan-600 text-[#fafafa] p-6 rounded-t-xl">
                <p>One of my most productive days was throwing away 1000 lines of code.</p>
                </div>
                <div className="bg-[#e4eef1] text-[#111] p-4 text-center rounded-b-xl">
                <p className="font-medium text-xl text-cyan-800">Ken Thompson</p>
                <p>Designer of Unix Operating System</p>
                </div>
            </div>
            <div className="flex flex-row-reverse">
                <div className="border-2 border-[#cdcdcd] rounded-r-full flex items-center px-5 w-80">
                <p>
                    A ship in port is safe, but that's not what ships are build for.
                </p>
                </div>
                <div className="bg-blue-500 text-[#fafafa] p-5 pr-6 w-56 flex flex-col gap-3 items-start">
                <p className="text-xl">Admiral Grace Hopper</p>
                <p>Inventor of Programming Compilers</p>
                </div>
            </div>
            <div className="flex flex-col items-start">
                <div className="bg-purple-500 text-[#fafafa] p-5 rounded-t-2xl rounded-br-2xl">
                <p>If you optimize everything you will always be unhappy.</p>
                </div>
                <div className="bg-purple-300 text-[#424242] p-4 justify-self-start rounded-b-2xl">
                    <p className="text-xl font-medium">Donald Knuth</p>
                    <p>Pioneer of Algorithm Analysis</p>
                </div>
            </div>
        </div>
    )
}

export default TestimonialComponent