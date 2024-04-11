import { SinglePaste } from "@/components/SinglePaste";
import { useLoaderData } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

type Paste = {
  id: number;
  title: string;
  content: string;
  isPrivate: boolean;
};

const MyPastes = () => {
  const pastes = useLoaderData() as Paste[];

  console.log(pastes);

  return (
    <div>
      <h1 className="text-2xl font-bold">My pastes</h1>

      {pastes.length === 0 ? (
        <>
          <p>No pastes found.</p>
          <a
            className={buttonVariants({ variant: "default" })}
            href="/pastes/new"
          >
            Create your first one!
          </a>
        </>
      ) : (
        <div className="grid gap-3 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3">
          {pastes.map((p: Paste) => {
            return (
              <SinglePaste
                key={p.id}
                title={p.title}
                content={p.content}
                isPrivate={p.isPrivate}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyPastes;
