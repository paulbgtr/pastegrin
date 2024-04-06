import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  return (
    <header className="flex items-center w-full h-20 px-4 shrink-0 md:px-6">
      <a className="hidden my-auto mr-6 lg:flex" href="/">
        <span className="text-xl font-bold">pg.</span>
      </a>
      <nav className="hidden gap-6 ml-auto lg:flex">
        <a className={buttonVariants({ variant: "outline" })} href="#">
          New Paste
        </a>
        <a
          className={buttonVariants({ variant: "outline" })}
          href="https://github.com/paulbgtr/pastegrin"
        >
          Github
        </a>
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Pastes</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/signin";
              }}
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
};
