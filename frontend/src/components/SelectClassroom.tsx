import { FC, useEffect, useState } from "react";
import Popover from "@/components/ui/popover";
import Button from "@/components/ui/button";
import Command from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils/shadcn";
import { useNavigate } from "@tanstack/react-router";
import JoinClassroom from "./JoinClassroom";
import useAuth from "@/hooks/useAuth";
import CreateClassroom from "./CreateClassroom";

type classroom = {
  _id: string;
  title: string;
};

interface SelectClassroomProps {
  classrooms: classroom[];
  defaultValue?: string;
}

const SelectClassroom: FC<SelectClassroomProps> = ({
  classrooms,
  defaultValue = "",
}) => {
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [value, setValue] = useState<string>(defaultValue);
  const { userData } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (classrooms.length > 0) {
      setData("classrooms", classrooms);
      const seletedClassroomString = getData("seletedClassroom");

      if (seletedClassroomString) {
        const seletedClassroom = JSON.parse(seletedClassroomString) as {
          _id?: string | null;
          title?: string | null;
        };
        if (seletedClassroom?._id) {
          setValue(seletedClassroom?._id);
          navigate({
            to: "/classroom/$classroomId",
            params: { classroomId: seletedClassroom?._id },
          });
        }
      } else {
        setData("seletedClassroom", classrooms[0]);
      }
    }
  }, [classrooms, navigate]);

  const handleSelect = (currentValue: string, classroom: classroom) => {
    setValue(currentValue === value ? "" : currentValue);
    setData("seletedClassroom", classroom);
    navigate({
      to: "/classroom/$classroomId",
      params: { classroomId: classroom._id },
    });
    setOpenPopover(false);
  };

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <Popover.trigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={openPopover}
          className="w-56 justify-between overflow-hidden"
        >
          {value
            ? classrooms.find((classroom) => classroom._id === value)?.title
            : "Select a classroom"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </Popover.trigger>
      <Popover.content className="w-56 p-0">
        <Command>
          <Command.input placeholder="Search classroom...." />
          <Command.list>
            <Command.empty>No classroom found.</Command.empty>
            <Command.group>
              {classrooms.map((classroom, idx) => (
                <Command.item
                  key={`${classroom._id} ${idx}`}
                  value={classroom._id}
                  onSelect={(currentValue) =>
                    handleSelect(currentValue, classroom)
                  }
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === classroom._id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {classroom.title}
                </Command.item>
              ))}
              {userData?.role !== "user" && (
                <CreateClassroom
                  id={userData?._id!}
                  trigger={
                    <Button variant="outline" size="sm" className="mt-1 w-full">
                      Create classroom
                      <span className="sr-only">Create new classroom</span>
                    </Button>
                  }
                />
              )}
              <JoinClassroom
                trigger={
                  <Button size="sm" className="mt-1 w-full">
                    Join new classroom
                    <span className="sr-only">Join new classroom</span>
                  </Button>
                }
              />
            </Command.group>
          </Command.list>
        </Command>
      </Popover.content>
    </Popover>
  );
};

function setData(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getData(key: string) {
  return localStorage.getItem(key);
}

export default SelectClassroom;
