const Navbar = () => {
    return (
        <>
            <div className="flex w-full justify-between items-center border-b-cyan-950 border-2 h-16 bg-neutral-50">
                <h1 className="content-start text-3xl text-cyan-950 pl-10">Product List</h1>
                <div className="pr-10 place-items-center space-x-5">

                    <button className="text-2xl h-11 transition-all duration-[30ms] hover:border-cyan-700 hover:border-2 ease-out text-cyan-950 bg-neutral-50 shadow-md border-[#010101] rounded-lg w-48">Add</button>
                    <button className="text-2xl h-11 transition-all duration-[30ms] hover:border-cyan-700 hover:border-2 ease-out text-cyan-950 bg-neutral-50 shadow-md border-[#010101] rounded-lg w-48">Mass Delete</button>
                </div>
            </div>
        </>
    );
}

export default Navbar;