import Link from "next/link";
import config from "../../utils/config";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white py-4 px-6">
      <div className="container mx-auto flex justify-center items-center py-5">
        <h1 className="text-2xl font-bold underline">
          <Link href="/">{config.siteName}</Link>
        </h1>
      </div>
      <div className="container mx-auto flex justify-center items-center py-5">
        <Nav />
      </div>
    </header>
  );
}
