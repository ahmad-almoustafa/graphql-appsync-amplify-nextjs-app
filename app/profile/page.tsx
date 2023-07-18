"use client";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import '@/configureAmplify';
/**
 * { Authenticator } from '@aws-amplify/ui-react' => Authenticator component adds complete authentication flows (sign in, sign out, create account, verification email)to your application with minimal boilerplate.
 * @see https://ui.docs.amplify.aws/react/connected-components/authenticator
 */
export default function Profile() {
  return (
    <div className="py-14 bg-gray-100 flex items-center justify-center">
      <div className="max-w-xl w-full p-6 bg-white shadow-md rounded-md">
        <Authenticator>
          {({ signOut, user }) => (
            <div>
              <h1 className="text-xl mb-4">Hello: {user?.username}</h1>
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                onClick={signOut}
              >
                Sign out
              </button>
            </div>
          )}
        </Authenticator>
      </div>
    </div>
  );
}