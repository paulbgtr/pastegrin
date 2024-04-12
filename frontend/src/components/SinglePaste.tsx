import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

export const SinglePaste = ({
  id,
  title,
  content,
  isPrivate,
}: {
  id: number;
  title: string;
  content: string;
  isPrivate: boolean;
}) => {
  return (
    <a className="transition hover:opacity-80" href={`/pastes/${id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{title ? title : "Untitled"}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{content}</p>
        </CardContent>
        <CardFooter>
          <CardDescription>{isPrivate ? "Private" : "Public"}</CardDescription>
        </CardFooter>
      </Card>
    </a>
  );
};
