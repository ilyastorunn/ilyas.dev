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
        <div className="col-span-8 flex justify-center">
          <div className="grid grid-cols-3 gap-[32px]">
            <img
              src={mind1}
              alt=""
              className="w-[262px] h-[349px] rounded-[30px] hover:filter hover:blur-sm hover:text-red-500 transition ease-in-out duration-300"
            />
            <img
              src={mind2}
              alt=""
              className="w-[262px] h-[349px] rounded-[30px]"
            />
            <img
              src={mind3}
              alt=""
              className="w-[262px] h-[349px] rounded-[30px]"
            />
            <img
              src={mind4}
              alt=""
              className="w-[262px] h-[349px] rounded-[30px]"
            />
            <img
              src={mind5}
              alt=""
              className="w-[262px] h-[349px] rounded-[30px]"
            />
            <img
              src={mind6}
              alt=""
              className="w-[262px] h-[349px] rounded-[30px]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
