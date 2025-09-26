import { handleFacebookSignIn, handleGitHubSignIn, handleGoogleSignIn } from "@/app/actions/authAction";
import React from "react";

export default function SocialLogin() {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {/* Google */}
        <button
          type="button"
          onClick={() => handleGoogleSignIn()}
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span className="ml-2">Google</span>
        </button>

      

        {/* GitHub */}
        <button
          type="button"
          onClick={() => handleGitHubSignIn()}
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 .5C5.648.5.5 5.648.5 12c0 5.086 3.292 9.386 7.868 10.912.575.106.786-.25.786-.555 0-.274-.01-1.002-.015-1.967-3.2.695-3.878-1.542-3.878-1.542-.523-1.33-1.277-1.684-1.277-1.684-1.043-.714.079-.699.079-.699 1.152.081 1.757 1.183 1.757 1.183 1.026 1.757 2.693 1.249 3.35.955.104-.743.401-1.25.729-1.538-2.553-.29-5.236-1.276-5.236-5.678 0-1.254.45-2.278 1.184-3.08-.119-.29-.513-1.459.112-3.041 0 0 .964-.308 3.16 1.176A11.02 11.02 0 0112 6.844c.977.005 1.963.132 2.88.387 2.196-1.484 3.159-1.176 3.159-1.176.626 1.582.232 2.751.114 3.041.737.802 1.184 1.826 1.184 3.08 0 4.412-2.687 5.385-5.252 5.669.413.355.781 1.057.781 2.132 0 1.54-.014 2.78-.014 3.158 0 .308.209.667.793.554C20.71 21.382 24 17.082 24 12c0-6.352-5.148-11.5-12-11.5z"
            />
          </svg>
          <span className="ml-2">GitHub</span>
        </button>

        {/* Facebook */}
        <button
          type="button"
          onClick={() => handleFacebookSignIn()}
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82V14.708h-3.41v-3.62h3.41V8.413c0-3.377 2.064-5.218 5.082-5.218 1.445 0 2.686.107 3.047.155v3.53h-2.09c-1.64 0-1.957.78-1.957 1.924v2.525h3.91l-.51 3.62h-3.4V24h6.673C23.403 24 24 23.403 24 22.676V1.325C24 .597 23.403 0 22.675 0z" />
          </svg>
          <span className="ml-2">Facebook</span>
        </button>
      </div>
    </div>
  );
}
