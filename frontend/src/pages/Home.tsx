import Button from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { FC } from "react";

const Home: FC = () => {
  return (
    <div className="flex min-h-[calc(100vh-190px)] w-full flex-col items-center justify-center gap-4 py-10 text-center">
      <h1 className="text-5xl font-bold">
        Welcome to <span className="text-primary">Pocket school</span> <br />{" "}
        quiz competition.
      </h1>
      <p>Test your skills</p>
      <Button asChild>
        <Link to="/classroom">Classroom</Link>
      </Button>
    </div>
  );
};

export default Home;
