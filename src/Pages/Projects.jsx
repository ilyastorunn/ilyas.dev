import Header from "../Components/Header";
import Project1 from "../assets/pics/Project1.png";
import Project2 from "../assets/pics/Project2.png";
import Project3 from "../assets/pics/Project3.png";
import Project4 from "../assets/pics/Project4.png";

export default function Projects() {
  return (
    <>
      <div className="container mx-auto grid grid-cols-8 px-4 my-5 max-w-[800px]">
        <div className="grid col-span-4 col-start-3 items-center justify-center">
          <Header />
        </div>
        <div className="flex flex-col items-start col-span-4 col-start-3 mb-16 ml-4 mt-16">
          <span className="text-pearl-white text-medium1">
            My latest projects:
          </span>
        </div>
        <div className="col-span-4 col-start-3 text-center mb-16">
          <img
            src={Project1}
            className="rounded-[30px]"
            alt="Cryotocurrency Tracker"
          />
          <span className="block text-pearl-white text-small opacity-90 mt-4">
            Cryptocurrency Tracker
          </span>
        </div>
        <div className="col-span-4 col-start-3 grid grid-cols-2 gap-4 text-center mb-16">
          <div>
            <img src={Project2} className="rounded-[30px]" alt="Emoji Tic-Tac-Toe" />
            <span className="block text-pearl-white text-small opacity-90 mt-4">
              Emoji Tic-Tac-Toe
            </span>
          </div>
          <div>
            <img src={Project3} className="rounded-[30px]" alt="E-commerce App" />
            <span className="block text-pearl-white text-small opacity-90 mt-4">
              E-commerce App
            </span>
          </div>
        </div>
        <div className="col-span-4 col-start-3 justify-center items-center text-center mb-16">
          <img src={Project4} className="rounded-[30px]" alt="Netflix Clone" />
          <span className="block text-pearl-white text-small opacity-90 mt-4">
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
        <div className="grid gap-5 col-span-4 col-start-3 items-start text-pearl-white font-zeyada text-small2 mt-[128px]">
          <span className="w-full h-[1px] bg-gray-4 opacity-40 mb-[40px]"></span>
          <span className="opacity-90">
            Perfectionism doesn't
            <br />
            advance anything.
            <br />
            Ironically.
          </span>
          <span className="text-end block opacity-90">Virgil Abloh</span>
          <span className="w-full h-[1px] bg-gray-4 opacity-40 mt-[40px] mb-[40px]"></span>
        </div>
      </div>
    </>
  );
}