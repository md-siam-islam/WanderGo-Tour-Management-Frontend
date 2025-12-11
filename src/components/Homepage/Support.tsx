const Support = () => {
    return (
        <div className="mb-20 p-10 flex items-center justify-center gap-32 " style={{ backgroundImage: "url('/src/assets/BannerImage/tent-3.svg')" }}>

            <div>

                <h2 className="text-2xl font-bold" style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                }}>☆───Why Us?───☆</h2>

            </div>
            <div className=" flex items-center justify-center gap-10">

                <div className="">
                    <h3 className="font-semibold text-2xl">24-hour Support</h3>
                    <p className="text-lg text-gray-600">It has survived not only five centuries, 
                        but also the leap</p>
                </div>
                <div className="">
                    <h3 className="font-semibold text-2xl">No Hidden Fees</h3>
                    <p className="text-lg text-gray-600">It has survived not only five centuries, but also the leap</p>
                </div>
                <div className="">
                    <h3 className="font-semibold text-2xl">Included Transfers</h3>
                    <p className="text-lg text-gray-600">It has survived not only five centuries, but also the leap</p>
                </div>
                <div className="">
                    <h3 className="font-semibold text-2xl">Booking Flexibility</h3>
                    <p className="text-lg text-gray-600">It has survived not only five centuries, but also the leap</p>
                </div>
            </div>
        </div>
    );
};

export default Support;