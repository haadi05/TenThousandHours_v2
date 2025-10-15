import { SkillsCard, AddCard } from "../importStore";
import useSkillStore from "../store/skillStore";

function Home() {
  const { skills } = useSkillStore();

  return (
    <div className="flex flex-col justify-center items-center px-50 py-4">
      <div className="flex justify-between items-center w-full">
        <p className="text-xl text-secondary">Your Skills</p>
      </div>

      <div className="w-full grid grid-cols-3 gap-4 mt-4">
        {skills.map((skill) => (
          <div key={skill.id}>
            <SkillsCard skillObj={skill} />
          </div>
        ))}
        <AddCard />
      </div>
    </div>
  );
}

export default Home;
