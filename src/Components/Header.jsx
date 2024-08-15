export default function Header() {
  return (
    <>
      <div className="flex flex-col items-center justify-center px-4 py-2 w-[556px] h-[58px] rounded-small bg-gray-4">
        <div className="flex items-center justify-center gap-4">
          <div className="flex w-[92px] h-[42px] px-5 py-2 justify-center items-center gap-[10px] rounded-large bg-gray-4">
            <span className="text-gray-2 text-small1">About</span>
          </div>
          <div className="flex w-[92px] h-[42px] px-5 py-2 justify-center items-center gap-[10px] rounded-large bg-gray-4">
            <span className="text-gray-2 text-small1">Projects</span>
          </div>
          <div className="flex w-[92px] h-[42px] px-5 py-2 justify-center items-center gap-[10px] rounded-large bg-gray-4">
            <span className="text-gray-2 text-small1">Skills</span>
          </div>
          <div className="flex w-[92px] h-[42px] px-5 py-2 justify-center items-center gap-[10px] rounded-large bg-gray-4">
            <span className="text-gray-2 text-small1">Mind</span>
          </div>
          <div className="flex w-[92px] h-[42px] px-5 py-2 justify-center items-center gap-[10px] rounded-large bg-gray-4">
            <span className="text-gray-2 text-small1">Contact</span>
          </div>
        </div>
      </div>
    </>
  );
}
