import Header from "../Components/Header";
import Project1 from "../assets/pics/Project1.png";
import Project2 from "../assets/pics/Project2.png";
import Project3 from "../assets/pics/Project3.png";
import Project4 from "../assets/pics/Project4.png";
import Project5 from "../assets/pics/Project5.png";
import Project6 from "../assets/pics/Project6.png";

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
          <a href="https://github.com/ilyastorunn/habits" target="_blank">
            <img
              src={Project5}
              className="rounded-[30px] w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
              alt="Daily Habits Tracker"
            />
          </a>
          <a
            href="https://github.com/ilyastorunn/habits"
            target="_blank"
            className="block text-pearl-white text-small opacity-90 mt-4 hover:underline"
          >
            Daily Habits Tracker
          </a>
        </div>
        <div className="col-span-4 col-start-3 grid grid-cols-2 gap-4 text-center mb-16">
          <div>
            <a
              href="https://github.com/ilyastorunn/tic-tac-toe"
              target="_blank"
            >
              <img
                src={Project2}
                className="rounded-[30px] object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                alt="Emoji Tic-Tac-Toe"
              />
            </a>
            <a
              href="https://github.com/ilyastorunn/tic-tac-toe"
              target="_blank"
              className="block text-pearl-white text-small opacity-90 mt-4 hover:underline"
            >
              Emoji Tic-Tac-Toe
            </a>
          </div>
          <div>
            <img
              src={Project3}
              className="rounded-[30px]"
              alt="E-commerce App"
            />
            <span className="block text-pearl-white text-small opacity-90 mt-4">
              E-commerce App
            </span>
          </div>
        </div>
        <div className="col-span-4 col-start-3 justify-center items-center text-center mb-16">
          <a href="https://github.com/ilyastorunn/plak" target="_blank">
            <img
              src={Project6}
              className="rounded-[30px] object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
              alt="Netflix Clone"
            />
          </a>
          <a
            href="https://github.com/ilyastorunn/plak"
            target="_blank"
            className="block text-pearl-white text-small opacity-90 mt-4 hover:underline"
          >
            "plak"
          </a>
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
