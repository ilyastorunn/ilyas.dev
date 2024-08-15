import SpotifyWidget from "../Components/SpotifyWidget";

export default function About() {
  return (
    <>
      <div className="container mx-auto grid grid-cols-8 gap-8 px-4 my-5 max-w-[1200px]">
        <div className="flex flex-col items-start col-span-4 col-start-3 pt-4">
          <span className="text-pearl-white text-large3">
            Hey I'm Ilyas, <br /> Front-End Developer.
          </span>
          <span className="text-pearl-white text-small opacity-90 mt-4">
            I build things for web. <br />
            In this little corner of the internet. <br />
            You can learn about me and what I do.
          </span>
        </div>
        <div className="flex items-start col-span-4 col-start-3 gap-10">
          <span className="flex-1 aspect-square rounded-[20px] bg-pearl-white"></span>
          <span className="flex-1 aspect-square rounded-[20px] bg-pearl-white"></span>
        </div>
        <div className="flex flex-col items-start col-span-4 col-start-3 pt-4 gap-9 opacity-80">
          <span className="text-pearl-white text-small">
            My interest in coding started back in 2018 when <br />
            I was taking C++ class in university. <br />
            Fast-forward to today, I'm a Front-End Developer <br />
            who works with several technologies.
          </span>
          <span className="text-pearl-white text-small">
            I craft digital products and delightful experiences, <br />
            build my ideas and nerd out over things I like.
          </span>
          <span className="text-pearl-white text-small">
            I find joy in building things and pushing my boundaries.
          </span>
          <span className="text-pearl-white text-small">
            Apart of coding, you can find me watching sports, <br />
            reading, learning Japan, ocassionally making music.
          </span>
        </div>
        <div className="flex flex-col items-start col-span-4 col-start-3 pt-4 gap-9">
          <SpotifyWidget />
        </div>
        <div className="flex flex-col items-start col-span-4 col-start-3 pt-4 gap-9 opacity-80">
          <span className="text-pearl-white text-small leading-7">
            Growing up, I had a passion for making music and aspired <br />
            to become musician.
          </span>
          <span className="text-pearl-white text-small leading-7">
            Today, I've become a developer instead. I still enjoy making <br />
            music occassionally.
          </span>
        </div>
      </div>
    </>
  );
}
