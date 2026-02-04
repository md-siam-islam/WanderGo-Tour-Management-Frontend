import { Link } from "react-router";
import { Button } from "../ui/button";


const Explore = () => {
    return (
        <div className=" my-20  flex items-center justify-between max-w-full gap-10 lg:flex-row flex-col px-5 ">
            <div className=" bg-[#FBF9F6]  w-1/2 p-10 rounded-4xl h-full">
                <div className="w-full flex items-center justify-between gap-3">
                    <div className="w-1/2">
                        <h2 className="text-4xl font-semibold mb-2">
                            Lorem ipsum dolor sit amet consectetur.
                        </h2>
                        <p className="mb-2 text-lg text-gray-600">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum cumque vitae at dolor exercitationem. Accusamus mollitia pariatur ipsa cumque sit beatae voluptas exercitationem repellat
                        </p>

                        <Button asChild size={"lg"}>
                            <Link to="/about">
                                Explore More
                            </Link>
                        </Button>
                    </div>
                    <div className="w-1/2">

                        <img className="w-full rounded-4xl" src="/src/assets/BannerImage/bannerimage.jpg" alt="" />

                    </div>
                </div>
            </div>

            <div className="w-1/2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                    {/* card 1 */}
                    <div className="transition-all duration-500 hover:shadow-xl hover:scale-105 hover:border-none border-[#EF1A53] border-2 rounded-4xl p-6 flex flex-col items-center">
                        <div className="bg-[#FBF9F6] rounded-full p-4 mb-4">
                            <img
                                className="w-14 h-14"
                                src="https://img.icons8.com/?size=80&id=urSy1bOP-B8H&format=png"
                                alt=""
                            />
                        </div>
                        <h2 className="text-4xl font-bold text-foreground mb-1">45K+</h2>
                        <p className="text-xl font-medium">Happy campers</p>
                    </div>

                    <div className="transition-all duration-500 hover:shadow-xl hover:scale-105 hover:border-none border-[#EF1A53] border-2 shadow-card rounded-4xl p-6 flex flex-col items-center">
                        <div className="bg-[#FBF9F6] rounded-full p-4 mb-4">
                            <img
                                className="w-14 h-14"
                                src="https://img.icons8.com/?size=80&id=Xnmiupwu5Fp5&format=png"
                                alt=""
                            />
                        </div>
                        <h2 className="text-4xl font-bold text-foreground mb-1">1,500K+</h2>
                        <p className="text-xl font-medium">Trips sold</p>
                    </div>

                    <div className="transition-all duration-500 hover:shadow-xl hover:scale-105 hover:border-none border-[#EF1A53] border-2 shadow-card  rounded-4xl p-6 flex flex-col items-center">
                        <div className="bg-[#FBF9F6] rounded-full p-4 mb-4">
                            <img
                                className="w-14 h-14"
                                src="https://img.icons8.com/?size=80&id=CsbZi65eJHuc&format=png"
                                alt=""
                            />
                        </div>
                        <h2 className="text-4xl font-bold text-foreground mb-1">60+</h2>
                        <p className="text-xl font-medium">Destinations</p>
                    </div>

                    <div className="transition-all duration-500 hover:shadow-xl hover:scale-105 hover:border-none border-[#EF1A53] border-2 shadow-card  rounded-4xl p-6 flex flex-col items-center">
                        <div className="bg-[#FBF9F6] rounded-full p-4 mb-4">
                            <img
                                className="w-14 h-14"
                                src="https://img.icons8.com/?size=50&id=RWMwpfcceJM2&format=png"
                                alt=""
                            />
                        </div>
                        <h2 className="text-4xl font-bold text-foreground mb-1">150+</h2>
                        <p className="text-xl font-medium">Travel buddies</p>
                    </div>



                </div>
            </div>



        </div>
    );
};

export default Explore;