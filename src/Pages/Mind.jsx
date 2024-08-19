import mind1 from "../assets/pics/mind1.jpeg";
import mind2 from "../assets/pics/mind2.jpeg";
import mind3 from "../assets/pics/mind3.jpeg";
import mind4 from "../assets/pics/mind4.jpeg";
import mind5 from "../assets/pics/mind5.jpeg";
import mind6 from "../assets/pics/mind6.jpeg";

export default function Mind() {
  return (
    <>
      <div className="container mx-auto grid grid-cols-8 gap-8 px-4 my-5 max-w-[1200px]">
        <div className="grid col-span-4 col-start-3">
          <span className="text-pearl-white text-small2">
            Here is what's on my mind.
          </span>
          <span className="w-full h-[1px] bg-gray-4 opacity-40 mt-[60px] mb-[40px]"></span>
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
            <span className="opacity-80">
              Creating something new is the <br />
              difficult part. To make it and <br />
              build it and get everyone to follow? <br />
              Amazing.
            </span>
            <span className="text-end block opacity-80">Pep Guardiola</span>
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
        <div className="grid col-span-6 col-start-2 w-[262px] h-[349px] gap-[64px]">
          <div className="flex items-center gap-[32px]">
            <img
              src={mind1}
              alt=""
              className="rounded-[30px] hover:filter hover:blur-sm hover:text-red-500 transition ease-in-out duration-300"
            />
            <img src={mind2} alt="" className="rounded-[30px]" />
            <img src={mind3} alt="" className="rounded-[30px]" />
          </div>
          <div className="flex items-center gap-[32px]">
            <img src={mind4} alt="" className="rounded-[30px]" />
            <img src={mind5} alt="" className="rounded-[30px]" />
            <img src={mind6} alt="" className="rounded-[30px]" />
          </div>
        </div>
      </div>
    </>
  );
}
