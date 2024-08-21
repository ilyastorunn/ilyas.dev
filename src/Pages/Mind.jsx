import Header from "../Components/Header";
import mind1 from "../assets/pics/mind1.jpeg";
import mind2 from "../assets/pics/mind2.jpeg";
import mind3 from "../assets/pics/mind3.jpeg";
import mind4 from "../assets/pics/mind4.jpeg";
import mind5 from "../assets/pics/mind5.jpeg";
import mind6 from "../assets/pics/mind6.jpeg";

export default function Mind() {
  return (
    <>
      <div className="container mx-auto grid grid-cols-8 gap-8 px-4 my-5 max-w-[800px]">
        <div className="grid col-span-4 col-start-3 items-center justify-center mb-8">
          <Header />
        </div>
        <div className="grid col-span-4 col-start-3">
          <span className="text-pearl-white text-small2">
            Here is what's on my mind.
          </span>
          <span className="w-full h-[1px] bg-gray-4 opacity-40 mt-[40px] mb-[40px]"></span>
        </div>
        <div className="col-span-4 col-start-3 font-zeyada">
          <span className="text-gray-3 opacity-80 text-small1">
            Some quotes that inspires me
          </span>
          <div className="grid gap-5 col-span-4 col-start-3 items-start text-pearl-white font-zeyada text-small2 mt-[84px]">
            <span className="opacity-80">
              Turning something from an idea
              <br />
              into a reality can make it seem
              <br />
              smaller. It changes from unearthly
              <br />
              to earthly. The imagination has no
              <br />
              limits. The pysical world does.
              <br />
              The work exists in both.
            </span>
            <span className="text-end block opacity-80">Rick Rubin</span>
          </div>
          <div className="grid gap-5 col-span-4 col-start-3 items-start text-pearl-white font-zeyada text-small2 mt-[84px]">
            <span className="opacity-90">
              Creating something new is the <br />
              difficult part. To make it and <br />
              build it and get everyone to follow? <br />
              Amazing.
            </span>
            <span className="text-end block opacity-90">Pep Guardiola</span>
            <span className="w-full h-[1px] bg-gray-4 opacity-40 mt-[40px] mb-[40px]"></span>
          </div>
        </div>
        <div className="grid col-span-4 col-start-3 gap-[84px]">
          <span className="text-gray-3 opacity-80 text-small1 italic">
            Thinking about...
          </span>
          <div className="grid gap-[52px]">
            <span className="text-pearl-white text-small">
              What advice would I give to myself from 5 years ago?
            </span>
            <span className="text-gray-2 opacity-90">
              Lorem <br />
              Lorem <br />
              Lorem
            </span>
            <span className="text-end text-gray-3 opacity-80 underline">
              Read...
            </span>
          </div>
          <div className="grid gap-[52px]">
            <span className="text-pearl-white text-small">AI and software</span>
            <span className="text-gray-2 opacity-90">
              Lorem <br />
              Lorem <br />
              Lorem
            </span>
            <span className="text-end text-gray-3 opacity-80 underline">
              Read...
            </span>
          </div>
          <span className="w-full h-[1px] bg-gray-4 opacity-40 mb-[40px]"></span>
        </div>
        <div className="col-span-8 flex justify-center">
          <div className="grid grid-cols-3 gap-[32px]">
            <div className="relative w-[200px] h-[266px] rounded-[30px] overflow-hidden">
              <img
                src={mind1}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-start justify-start p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-pearl-white font-zeyada text-xl font-semibold mb-2">
                  They watching us. v1
                </h2>
                <p className="text-pearl-white font-zeyada text-sm">Konya, Turkey</p>
              </div>
            </div>

            <div className="relative w-[200px] h-[266px] rounded-[30px] overflow-hidden">
              <img
                src={mind2}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-start justify-start p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-pearl-white font-zeyada text-xl font-semibold mb-2">
                They watching us. v2
                </h2>
                <p className="text-pearl-white font-zeyada text-sm">Istanbul, Turkey</p>
              </div>
            </div>

            <div className="relative w-[200px] h-[266px] rounded-[30px] overflow-hidden">
              <img
                src={mind3}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-start justify-start p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-pearl-white font-zeyada text-xl font-semibold mb-2">
                  Cousin's Home
                </h2>
                <p className="text-pearl-white font-zeyada text-sm">Istanbul, Turkey</p>
              </div>
            </div>

            <div className="relative w-[200px] h-[266px] rounded-[30px] overflow-hidden">
              <img
                src={mind4}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-start justify-start p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-pearl-white font-zeyada text-xl font-semibold mb-2">
                  Resting time
                </h2>
                <p className="text-pearl-white font-zeyada text-sm">Izmir, Turkey</p>
              </div>
            </div>

            <div className="relative w-[200px] h-[266px] rounded-[30px] overflow-hidden">
              <img
                src={mind5}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-start justify-start p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-pearl-white font-zeyada text-xl font-semibold mb-2">
                  Skyscrapper, literally
                </h2>
                <p className="text-pearl-white font-zeyada text-sm">Konya, Turkey</p>
              </div>
            </div>

            <div className="relative w-[200px] h-[266px] rounded-[30px] overflow-hidden">
              <img
                src={mind6}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-start justify-start p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-pearl-white font-zeyada text-xl font-semibold mb-2">
                  Sweet nature
                </h2>
                <p className="text-pearl-white font-zeyada text-sm">Antalya, Turkey</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
