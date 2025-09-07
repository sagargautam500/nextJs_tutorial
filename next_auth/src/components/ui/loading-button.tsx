"use client"

import { Loader2 } from "lucide-react"
import { Button } from "./button"

interface LoadingButtonProps {
  pending: boolean
}

export default function LoadingButton({ pending }: LoadingButtonProps) {
  return (
    <Button
      variant="default" // shadcn default variant
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
    >
      {pending ? (
        <div className="flex items-center space-x-2">
          <Loader2 className="h-5 w-5 animate-spin text-white" />
          <span>Signing In...</span>
        </div>
      ) : (
        "Sign In"
      )}
    </Button>
  )
}
