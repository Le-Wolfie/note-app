import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Menu } from "lucide-react";
import React from "react";
import CreateNoteForm from "./_components/CreateNoteForm";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <CreateNoteForm />
        <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 p-4'>
          <Notes
            title='Shopping List'
            description='Milk, Eggs, Bread, Butter'
            footer='Last updated: 1 day ago'
          />
          <Notes
            title='Work Tasks'
            description='Finish report, Call client, Email team'
            footer='Last updated: 3 hours ago'
          />
          <Notes
            title='Books to Read'
            description='Atomic Habits, Deep Work, The Lean Startup'
            footer='Last updated: 2 days ago'
          />
          <Notes
            title='Vacation Ideas'
            description='Hawaii, Japan, Iceland'
            footer='Last updated: 5 days ago'
          />
          <Notes
            title='Grocery List'
            description='Tomatoes, Cheese, Lettuce, Chicken'
            footer='Last updated: 1 hour ago'
          />
          <Notes
            title='Meeting Notes'
            description='Discuss Q3 targets, Review budgets, Plan strategy'
            footer='Last updated: 6 hours ago'
          />
          <Notes
            title='Movie Watchlist'
            description='Inception, Interstellar, The Matrix'
            footer='Last updated: 2 days ago'
          />
          <Notes
            title='Fitness Goals'
            description='Run 5k, Gym 3x per week, Yoga on weekends'
            footer='Last updated: 4 days ago'
          />
          <Notes
            title='Recipe Ideas'
            description='Pasta, Salad, Stir-fry, Soup'
            footer='Last updated: 7 hours ago'
          />
          <Notes
            title='Gift Ideas'
            description='Books, Gadgets, Clothes'
            footer='Last updated: 3 days ago'
          />
          <Notes
            title='Project Brainstorming'
            description="Here are some ideas for the new project that we're planning. We could start by outlining the key goals and objectives. Then, we can move on to identifying potential challenges and how we might overcome them. Considerations for the budget and timeline should be factored in early on to ensure everything aligns with our resources. Collaboration with other teams will be essential to gather insights and drive innovation. Finally, let's not forget about potential marketing strategies and how we can position this project to maximize impact and reach our target audience effectively."
            footer='Last updated: 10 minutes ago'
          />
        </div>
      </div>
    </>
  );
};

export default page;

function Notes({
  title,
  description,
  footer,
}: {
  title: string;
  description: string;
  footer: string;
}) {
  return (
    <Card className='relative mb-4 break-inside-avoid border-2'>
      <CardHeader>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size='icon'
              variant='outline'
              className='bottom-1 right-1 border-none absolute'
            >
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Archive</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <CardTitle className='line-clamp-1'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className='line-clamp-2'>
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
}

function NotesWithMenu({
  title,
  description,
  footer,
}: {
  title: string;
  description: string;
  footer: string;
}) {
  return (
    <Card className='mb-4 break-inside-avoid'>
      <CardHeader>
        <CardTitle className='line-clamp-1'>{title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size='icon' className='absolute top-2 right-2'>
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <CardDescription className='line-clamp-2'>
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <p>{footer}</p>
      </CardFooter>
    </Card>
  );
}
