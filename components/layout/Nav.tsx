"use client";
import config from "@/utils/config";
import { Auth, Hub, Logger } from "aws-amplify";
import Link from "next/link";
import { useEffect, useState } from "react";
import "@/configureAmplify";

export function Nav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();

    // Subscribe to the Amplify Hub Auth events to listen for authentication changes
    Hub.listen("auth", listener);

  }, []);
  /**
   * Retrieve current authenticated user
   * @see https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/#retrieve-current-authenticated-user
   */
  async function checkAuthStatus() {
    try {
      const user = await Auth.currentAuthenticatedUser({
        bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      });
      setIsAuthenticated(true);
      //console.log('user',user);
    } catch (err) {
      //console.log('err',err);
      setIsAuthenticated(false);
    }
  }
  /**
   * Auth events
   * When these events occur=> checkAuthStatus  is called to update the isAuthenticated state=> Nav rerender 
   * @see https://docs.amplify.aws/lib/auth/auth-events/q/platform/js/
   */
  const logger = new Logger("My-Logger");
  const listener = (data: { payload: { event: any; }; }) => {
    switch (data.payload.event) {
      case "signIn":
        logger.info("user signed in");
        checkAuthStatus();
        break;
      case "signOut":
        logger.info("user signed out");
        checkAuthStatus();
        break;
    }
  };
  return (
    <nav className="flex flex-row gap-4">
      {config.routes.map((route, index) => {
        if (route.authenticated && !isAuthenticated) {
          return null;
        }
        return (
          <Link
            key={index}
            href={route.path}
            className="text-base underline hover:no-underline"
          >
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default Nav;
