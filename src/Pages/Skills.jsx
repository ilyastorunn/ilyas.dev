import Header from "../Components/Header";
import arrow from "../assets/pics/arrow.png";

export default function Skills() {
  return (
    <>
      <div className="container mx-auto grid grid-cols-8 px-4 my-5 max-w-[1200px]">
        <div className="grid col-span-4 col-start-3 items-center justify-center mb-16">
          <Header />
        </div>
        <div className="col-span-6 col-start-2 text-center mb-[52px]">
          <span className="text-pearl-white text-small2">
            Techs I'm using while coding:
          </span>
        </div>
        <div className="col-span-6 col-start-2 flex items-center justify-center gap-8">
          <div className="w-[230px] h-[230px] rounded-[30px] bg-black-6 bg-opacity-80 pl-6 pt-4">
            <span className="text-small text-pearl-white mb-6 block underline decoration-underline-gray">
              Languages
            </span>
            <div className="grid text-gray-2 opacity-90 gap-1">
              <span>HTML</span>
              <span>CSS</span>
              <span>JavaScript</span>
            </div>
          </div>
          <div className="w-[230px] h-[230px] rounded-[30px] bg-black-6 bg-opacity-80 pl-6 pt-4">
            <span className="text-small text-pearl-white mb-6 block underline decoration-underline-gray">
              Frameworks
            </span>
            <div className="grid text-gray-2 opacity-90 gap-1">
              <span>React</span>
              <span>Node</span>
              <span>Next</span>
              <span>Bootstrap</span>
              <span>Tailwind</span>
            </div>
          </div>
          <div className="w-[230px] h-[230px] rounded-[30px] bg-black-6 bg-opacity-80 pl-6 pt-4">
            <span className="text-small text-pearl-white mb-6 block underline decoration-underline-gray">
              Others
            </span>
            <div className="grid text-gray-2 opacity-90 gap-1">
              <span>Git</span>
              <span>GitHub</span>
              <span>Bash</span>
              <span>npm</span>
            </div>
          </div>
        </div>
        <div className="col-span-6 col-start-2 flex items-center justify-center mt-12">
          <div className="grid justify-items-end">
            <span className="text-gray-3 text-small font-zeyada opacity-75 text-right">
              What can I do is not <br />
              limited to these :)
            </span>
            <img src={arrow} alt="arrow" className="mt-2" />
          </div>
        </div>
        <div className="col-span-6 col-start-2 flex items-center justify-center mt-12 text-small1 text-gray-3 opacity-50 underline decoration-underline-gray">
          <span>
            See more on my
            <a
              href="https://github.com/ilyastorunn"
              target="_blank"
              rel="noopener noreferrer"
              className="pl-1"
            >
              GitHub
            </a>
          </span>
        </div>
        <div className="grid gap-5 col-span-4 col-start-3 items-start text-pearl-white font-zeyada text-small2 mt-[120px]">
          <span className="w-full h-[1px] bg-gray-4 opacity-40 mb-[44px]"></span>
          <span className="opacity-90">
            Creativity without business <br />
            is usually victimization. <br />
            And business without creativity <br />
            is a waste of time.
          </span>
          <span className="text-end block opacity-90">Pharrell Williams</span>
          <span className="w-full h-[1px] bg-gray-4 opacity-40 mt-[44px]"></span>
        </div>
      </div>
    </>
  );
}