import Button from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage(): JSX.Element {
  return (
    <div className="flex min-h-[calc(100vh-90px)] w-full flex-col items-center justify-center gap-4 text-center">
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
}
