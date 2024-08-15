import arrow from "../assets/pics/arrow.png";

export default function Skills() {
  return (
    <>
      <div className="container mx-auto grid grid-cols-8 px-4 my-5 max-w-[1200px]">
        <div className="col-span-6 col-start-2 text-center mb-[52px]">
          <span className="text-pearl-white text-small2">
            Techs I'm using while coding:
          </span>
        </div>
        <div className="col-span-6 col-start-2 flex items-center justify-center gap-8">
          <div className="w-[262px] h-[262px] rounded-[30px] bg-gray-4 bg-opacity-30 pl-6 pt-4">
            <span className="text-small text-pearl-white mb-6 block underline decoration-underline-gray">
              Languages
            </span>
            <div className="grid text-gray-2 opacity-90 gap-1">
              <span>HTML</span>
              <span>CSS</span>
              <span>JavaScript</span>
            </div>
          </div>
          <div className="w-[262px] h-[262px] rounded-[30px] bg-gray-4 bg-opacity-30 pl-6 pt-4">
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
          <div className="w-[262px] h-[262px] rounded-[30px] bg-gray-4 bg-opacity-30 pl-6 pt-4">
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
              What can i do is not <br />
              limited to these :)
            </span>
            <img src={arrow} alt="arrow" className="mt-2" />
          </div>
        </div>
        <div className="col-spa-6 col-start-2 flex items-center justify-center mt-12 text-small1 text-gray-3 opacity-50 underline decoration-underline-gray">
          <span className="">
            See more on my
            <a href="https://github.com/ilyastorunn" target="_blank" className="pl-1">
              GitHub
            </a>
          </span>
        </div>
      </div>
    </>
  );
}
