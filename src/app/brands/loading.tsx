import { LoaderCircle } from 'lucide-react'
import React from 'react'

export default function LoadingPage() {
  return (
      <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center">
      <LoaderCircle className='animate-spin' size={50} />
        <p> Loading.....</p>
          </div>

    </div>
  )
}
