import { Link } from "react-router-dom"

interface props {
    button1: string
    button1Action: string
    button2: string
    button2Action: () => void
    title: string
}

const Navbar = ({ button1, button2, title, button1Action, button2Action }: props) => {


    return (
        <>
            <div className="fixed flex w-full justify-between items-center border-b-cyan-950 border-2 z-50 h-16 bg-neutral-50">
                <h1 className="content-start text-2xl md:pl-10 md:text-3xl lg:text-4xl text-cyan-950 pl-5 lg:pl-20">{title}</h1>
                <div className="lg:pr-20 pr-5 md:pr-10 flex place-items-center space-x-5">

                    <Link
                        to={button1Action}>

                        <button className=" md:text-2xl md:w-32 lg:text-2xl h-11 transition-all duration-[30ms] hover:border-cyan-700 hover:border-2 ease-out text-cyan-950 bg-neutral-50 shadow-md border-[#010101] rounded-lg w-20 lg:w-48">{button1}</button>
                    </Link>
                    <button onClick={button2Action} className=" md:text-2xl md:w-32 lg:text-2xl h-11 transition-all duration-[30ms] hover:border-cyan-700 hover:border-2 ease-out text-cyan-950 bg-neutral-50 shadow-md border-[#010101] rounded-lg w-20 lg:w-48">{button2}</button>
                </div>
            </div>
        </>
    );
}

export default Navbar;