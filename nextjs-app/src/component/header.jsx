import Link from 'next/link'
import React from 'react'

function header() {
  return (
   <header className="bg-blue-500 p-5 m-3 text-2xl text-center rounded-sm" >
    <nav>
      <ul className="flex space-x-4 justify-evenly " >
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        <li><Link href="/course">Course</Link></li>
      </ul>
    </nav>
   </header>
  )
}

export default header