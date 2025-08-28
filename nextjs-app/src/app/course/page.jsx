import Link from 'next/link'
import React from 'react'

function CoursePage() {
  return (
    <div className="text-center py-10 bg-blue-100 min-h-screen">
      <div className="text-3xl font-bold mb-6 text-blue-700">Course Page</div>
      <ul className="space-y-4 max-w-md mx-auto">
        <Link href="/course/course_detail/course-1" className="bg-blue-800 rounded shadow p-4 hover:bg-blue-400 transition">Course 1</Link>
        <Link href="/course/course_detail/course-2" className="bg-blue-800 rounded shadow p-4 hover:bg-blue-400 transition">Course 2</Link>
        <Link href="/course/course_detail/course-3" className="bg-blue-800 rounded shadow p-4 hover:bg-blue-400 transition">Course 3</Link>
      </ul>
    </div>
  )
}

export default CoursePage