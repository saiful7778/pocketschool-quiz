import DeveloperForm from "@/components/forms/DeveloperForm";

const Developer: React.FC = () => {
  return <DeveloperForm handleSubmit={(e) => console.log(e)} loading={false} />;
};

export default Developer;
