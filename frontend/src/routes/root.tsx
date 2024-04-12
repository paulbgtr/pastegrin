import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";

const Root = () => {
  return (
    <>
      <section className="h-screen">
        <div className="grid items-center justify-center w-full h-full">
          <section className="text-center">
            <h1 className="text-3xl font-bold">pastegrin</h1>
            <p className="font-sm">
              A free and open-source pastebin alternative
            </p>

            <div className="flex flex-col gap-2 mt-3">
              <Button asChild>
                <a href="/pastes/new">Create a new paste</a>
              </Button>
              <Button asChild variant="outline">
                <a href="#faq">Is it safe?</a>
              </Button>
              <a
                className={buttonVariants({ variant: "outline" })}
                href="https://github.com/paulbgtr/pastegrin"
              >
                <GitHubLogoIcon className="w-4 h-4 mr-2" />
                Github
              </a>
            </div>
          </section>
        </div>
      </section>

      <section id="faq" className="h-screen">
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col max-w-xl gap-2">
            <h2 className="text-2xl font-bold">Mostly, yes.</h2>
            <p>
              I don't care about your data and I don't want to know who you are.
              I just want to provide a simple and easy way to share text with
              others.
            </p>

            <p>
              If you would create a new account, a JWT token will be generated
              and stored in your browser. This token will be used to
              authenticate you when you create a new paste.
            </p>

            <p>
              If you don't want to create an account, you can still create
              pastes, but they will be deleted after 24 hours.
            </p>

            <p>
              Also, please set a password for your paste. This way, only people
              with the password can view the paste.
            </p>

            <p>
              If a user has access to a paste, they can view it, edit it, and
              delete it. If you don't want to share your paste with others,
              don't share the link and set a password for it. Otherwise, anyone
              could go to the /pastes page and view all publicly available
              pastes.
            </p>

            <p>
              Create, share, and have fun! This is why the internet was created
              for.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Root;
