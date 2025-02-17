import Image from "next/image";

export default function NavBar(): React.ReactElement {
  return (
    <div className="flex h-[10rem] w-full">
      <Image
        src={"/banner.png"}
        alt="Stability Banner for Funzip"
        className="w-36 h-auto"
      />
    </div>
  );
}
