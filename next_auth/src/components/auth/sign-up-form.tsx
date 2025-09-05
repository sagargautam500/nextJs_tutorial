"use client"

import { useFormState } from "react-dom"
import React from "react"

type ActionState = { error?: string; fieldErrors?: Partial<Record<"name" | "address" | "email" | "password", string>> }

export default function SignUpForm({ action }: { action: (state: ActionState, formData: FormData) => Promise<ActionState> }) {
  const [state, formAction] = useFormState(action, { error: undefined })

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state?.error && (
        <div className="rounded border border-red-300 bg-red-50 text-red-700 px-3 py-2 text-sm">
          {state.error}
        </div>
      )}

      <label className="flex flex-col gap-1 text-sm font-medium">
        Name
        <input name="name" type="text" required className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {state?.fieldErrors?.name && <span className="text-xs text-red-600">{state.fieldErrors.name}</span>}
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium">
        Address
        <input name="address" type="text" required className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {state?.fieldErrors?.address && <span className="text-xs text-red-600">{state.fieldErrors.address}</span>}
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium">
        Email
        <input name="email" type="email" required className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {state?.fieldErrors?.email && <span className="text-xs text-red-600">{state.fieldErrors.email}</span>}
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium">
        Password (min 8)
        <input name="password" type="password" required className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {state?.fieldErrors?.password && <span className="text-xs text-red-600">{state.fieldErrors.password}</span>}
      </label>
      <button type="submit" className="mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold">Create account</button>
    </form>
  )
}


