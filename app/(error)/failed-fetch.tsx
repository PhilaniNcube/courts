/**
 * v0 by Vercel.
 * @see https://v0.dev/t/tERHsh2qsaB
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { CloudOffIcon } from "lucide-react"

export default function FailedFetch() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 space-y-8 bg-white rounded-md shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <CloudOffIcon className="w-12 h-12 mx-auto text-gray-900 dark:text-gray-100" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-100">Oops! Fetch Failed</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            We're sorry, but we couldn't retrieve the data. Please check your internet connection and try again.
          </p>
        </div>
        <div className="flex justify-center mt-6">
          <Button className="w-full" variant="outline">
            Retry Fetch
          </Button>
        </div>
      </div>
    </div>
  )
}


