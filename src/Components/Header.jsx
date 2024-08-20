import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <>
      <div className="flex flex-col items-center justify-center px-4 py-2 max-w-[412px] max-h-[56px] rounded-small bg-black-6">
        <div className="flex items-center justify-center gap-2">
          <div
            className={`flex px-5 py-2 justify-center items-center gap-[10px] max-w-[67px] max-h-[40px] rounded-large bg-black-6 flex-shrink-0 ${
              location.pathname === '/' ? '' : 'hover:bg-header-hover'
            }`}
          >
            <a
              href="/"
              className={`text-gray-2 ${
                location.pathname === '/' ? 'opacity-100' : 'opacity-80'
              } text-small1`}
            >
              About
            </a>
          </div>
          <div
            className={`flex px-5 py-2 justify-center items-center gap-[10px] max-w-[67px] max-h-[40px] rounded-large bg-black-6 flex-shrink-0 ${
              location.pathname === '/projects' ? '' : 'hover:bg-header-hover'
            }`}
          >
            <a
              href="/projects"
              className={`text-gray-2 ${
                location.pathname === '/projects' ? 'opacity-100' : 'opacity-80'
              } text-small1`}
            >
              Projects
            </a>
          </div>
          <div
            className={`flex px-5 py-2 justify-center items-center gap-[10px] max-w-[67px] max-h-[40px] rounded-large bg-black-6 flex-shrink-0 ${
              location.pathname === '/skills' ? '' : 'hover:bg-header-hover'
            }`}
          >
            <a
              href="/skills"
              className={`text-gray-2 ${
                location.pathname === '/skills' ? 'opacity-100' : 'opacity-80'
              } text-small1`}
            >
              Skills
            </a>
          </div>
          <div
            className={`flex px-5 py-2 justify-center items-center gap-[10px] max-w-[67px] max-h-[40px] rounded-large bg-black-6 flex-shrink-0 ${
              location.pathname === '/mind' ? '' : 'hover:bg-header-hover'
            }`}
          >
            <a
              href="/mind"
              className={`text-gray-2 ${
                location.pathname === '/mind' ? 'opacity-100' : 'opacity-80'
              } text-small1`}
            >
              Mind
            </a>
          </div>
          <div
            className={`flex px-5 py-2 justify-center items-center gap-[10px] max-w-[67px] max-h-[40px] rounded-large bg-black-6 flex-shrink-0 ${
              location.pathname === '/contact' ? '' : 'hover:bg-header-hover'
            }`}
          >
            <a
              href="/contact"
              className={`text-gray-2 ${
                location.pathname === '/contact' ? 'opacity-100' : 'opacity-80'
              } text-small1`}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
