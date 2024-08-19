import Header from "../Components/Header";
import { CiMail, CiLinkedin } from "react-icons/ci";
import { VscGithubAlt } from "react-icons/vsc";

export default function Contact() {
  return (
    <>
      <div className="container mx-auto grid grid-cols-8 gap-8 px-4 my-5 max-w-[1200px]">
        <div className="grid col-span-4 col-start-3 items-center justify-center">
          <Header />
        </div>
        <div className="grid col-span-4 col-start-3 items-center justify-center text-center">
          <span className="text-medium1 text-pearl-white mt-8">
            Thanks for taking the time to reach out.
            <br /> How can I help you today?
          </span>
        </div>
        <div className="col-span-3 col-start-2 flex flex-col items-center justify-center gap-8">
          <span className="text-center text-pearl-white text-small2">
            Web developer at
            <br />
            self-employed in Turkey.
          </span> 
          <div className="flex flex-col gap-8 text-small1">
            <div className="flex gap-2 items-center">
              <VscGithubAlt className="text-pearl-white" />
              <a
                href="https://github.com/ilyastorunn"
                target="_blank"
                className="text-pearl-white"
              >
                github.com/ilyastorunn
              </a>
            </div>
            <div className="flex gap-2 items-center">
              <CiLinkedin className="text-pearl-white" />
              <a
                href="https://www.linkedin.com/in/ilyastorunn/"
                target="_blank"
                className="text-pearl-white"
              >
                @ilyastorunn
              </a>
            </div>
            <div className="flex gap-2 items-center">
              <CiMail className="text-pearl-white" />
              <a
                href="mailto:ilyastorunn@outlook.com"
                target="_blank"
                className="text-pearl-white"
              >
                ilyastorunn@outlook.com
              </a>
            </div>
          </div>
        </div>
        <div className="col-span-3 col-start-5 rounded-[30px] bg-gray-4">
          <div className="flex justify-center items-center leading-none text-small2 text-pearl-white mt-8">
            <CiMail className="mb-1" />
            <span className="ml-2">Get in touch</span>
          </div>
          <div className="grid gap-10 p-7">
            <div className="grid gap-2">
              <span className="text-pearl-white text-small1">Name:</span>
              <input
                type="text"
                // placeholder="name"
                className="w-full h-[48px] p-3 rounded-[10px] bg-pearl-white text-gray-3"
              />
            </div>
            <div className="grid gap-2">
              <span className="text-pearl-white text-small1">Email:</span>
              <input
                type="text"
                // placeholder="name"
                className="w-full h-[48px] p-3 rounded-[10px] bg-pearl-white text-gray-3"
              />
            </div>
            <div className="grid gap-2">
              <span className="text-pearl-white text-small1">Message:</span>
              <textarea
                // placeholder="message"
                className="w-full h-[150px] p-3 rounded-[10px] bg-pearl-white text-dark-gray"
              />
            </div>
            <button className="px-6 py-2 rounded-[10px] bg-black-5-alternative text-pearl-white text-small1 font-semibold shadow-lg tracking-wide mt-5 hover:bg-black-5">
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
