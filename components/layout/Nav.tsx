import config from "@/utils/config";
import Link from "next/link";

export function Nav(){
    return(
        <nav className="flex flex-row gap-4">
            {config.routes.map((route,index) => (
                <Link key={index} href={route.path} className="text-base underline hover:no-underline">
                    {route.label}
                </Link>
            )
            )}
        </nav>
    )
}

export default Nav;