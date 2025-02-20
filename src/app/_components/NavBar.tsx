import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";

export default function NavBar(): React.ReactElement {
  return (
    <div className="flex w-full h-20 p-2 justify-between">
      <div className="flex items-center h-full w-full">
        <div className="flex w-36 relative h-full p-4 bg-background rounded-lg">
          <Image
            src={"/banner.png"}
            alt="Stability Banner for Funzip"
            fill
            sizes="100%"
            className="object-contain"
          />
        </div>
        <div className="flex ml-8 gap-4 items-center">
          {/* <Link href="/">Board</Link>
          <Link href="/teams">Teams</Link> */}
        </div>
      </div>
      <ThemeToggle />
    </div>
  );
}
