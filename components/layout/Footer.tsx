import config from "@/utils/config";
import Link from "next/link";

const Footer = () => {
    return(        
        <div className=" bg-gray-900">
        <div className="max-w-2xl mx-auto text-white py-10">
          <div className="text-center">
            <h3 className="text-2xl mb-3"> {config.siteName}</h3>
            <p className=" pt-3 text-sm order-2 md:order-1 mt-8 md:mt-0"> © Created By: <Link href={config.authorURL} target="blank"> {config.author}</Link>, {new Date().getFullYear()}. </p>

          </div>

        </div>
      </div>
    )};
  export default Footer;
