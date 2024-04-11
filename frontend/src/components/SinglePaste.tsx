import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

export const SinglePaste = ({
  title,
  content,
  isPrivate,
}: {
  title: string;
  content: string;
  isPrivate: boolean;
}) => {
  return (
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
  );
};
