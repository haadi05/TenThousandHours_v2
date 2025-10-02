import { SkillsCard, AddCard } from "../importStore";

function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center px-18 py-4">
        <div className="flex justify-between items-center w-full">
          <p className="text-xl text-secondary">Your Skills</p>
        </div>
        <div className="w-full grid grid-cols-4 gap-4 mt-4">
          <SkillsCard />
          <AddCard />
        </div>
      </div>
    </>
  );
}

export default Home;
