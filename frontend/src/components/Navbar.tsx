import { buttonVariants } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUsername = async () => {
      // todo
    };

    const token = localStorage.getItem("token");

    if (token) {
      getUsername();

      setIsSignedIn(true);
      return;
    }
    setIsSignedIn(false);
  }, []);

  return (
    <header className="flex items-center w-full h-20 px-4 shrink-0 md:px-6">
      <a className="my-auto mr-6 lg:flex" href="/">
        <span className="text-xl font-bold">pg.</span>
      </a>
      <nav className="flex gap-3 ml-auto">
        <a
          className={buttonVariants({ variant: "outline" })}
          href="/pastes/new"
        >
          New Paste
        </a>
        <a className={buttonVariants({ variant: "outline" })} href="/pastes">
          Explore
        </a>
        {isSignedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              className={buttonVariants({ variant: "outline" })}
            >
              My Account
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <a href={`/user/${username}`}>Profile</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/me/pastes">Pastes</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/me/settings">Settings</a>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/signin";
                }}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <a className={buttonVariants({ variant: "outline" })} href="/signin">
            Sign In
          </a>
        )}
      </nav>
    </header>
  );
};
