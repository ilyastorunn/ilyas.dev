import Project1 from "../assets/pics/Project1.png";
import Project2 from "../assets/pics/Project2.png";
import Project3 from "../assets/pics/Project3.png";
import Project4 from "../assets/pics/Project4.png";

export default function Projects() {
  return (
    <>
      <div className="container mx-auto grid grid-cols-8 px-4 my-5 gap-[52px] max-w-[1200px]">
        <div className="col-span-4 col-start-3 text-center">
          <img
            src={Project1}
            className="rounded-[30px]"
            alt="Cryotocurrency Tracker"
          />
          <span className="block text-pearl-white text-small opacity-90  mt-4">
            Cryptocurrency Tracker
          </span>
        </div>
        <div className="grid col-span-4 col-start-3 text-center">
          <div className="col-start-3 col-end-4">
            <img src={Project2} alt="" />
            <span className="block text-pearl-white text-small opacity-90  mt-4">
              Emoji Tic-Tac-Toe
            </span>
          </div>
          <div className="col-start-5 col-end-6">
            <img src={Project3} alt="" />
            <span className="block text-pearl-white text-small opacity-90  mt-4">
              E-commerce App
            </span>
          </div>
        </div>
        <div className="col-span-4 col-start-3 justify-center items-center text-center">
          <img src={Project4} alt="" />
          <span className="block text-pearl-white text-small opacity-90  mt-4">
            Netflix Clone
          </span>
        </div>
        <a
          className="col-span-4 col-start-3 text-center text-gray-3 text-small1 opacity-70 underline"
          href="https://github.com/ilyastorunn"
          target="_blank"
        >
          View All Projects
        </a>
        <div className="grid gap-5 col-span-4 col-start-3 items-start text-pearl-white font-zeyada text-small2 mt-[84px]">
          <span className="w-full h-[1px] bg-gray-4 opacity-40 mb-[40px]"></span>
          <span className="opacity-80">
            Perfectionism doesn't
            <br />
            advance anything.
            <br />
            Ironically.
            <br />
          </span>
          <span className="text-end block opacity-80">Virgil Abloh</span>
          <span className="w-full h-[1px] bg-gray-4 opacity-40 mt-[40px] mb-[40px]"></span>
        </div>
      </div>
    </>
  );
}
