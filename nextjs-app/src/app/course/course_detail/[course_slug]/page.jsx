import React from 'react'

function CourseSlugPage({ params }) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-8">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Course Slug Page</h1>
      <p className="mb-4 text-gray-600">This is a dynamic page for a specific course.</p>
      <h2 className="text-xl font-semibold mb-2 text-gray-800">Course Details for <span className="text-blue-600">{params.course_slug}</span></h2>
      <p className="text-gray-700">Here you can display the details for the course based on the slug.</p>
    </div>
  )
}

export default CourseSlugPage