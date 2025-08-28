"use client";
// This file is a React component that displays a simple counter.
import React, { use, useEffect, useState } from 'react'

function Counter() {
  // This component is a simple counter that displays a static value of 0.
  const [count, setCount] = useState(0);

  useEffect(() => {
     const interval = setInterval(() => {
       setCount((prevCount) => prevCount + 1);
     }, 1000);

     return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div>
      <p className='text-2xl font-bold text-center'>Counter</p>
      <p className='text-lg text-center'>{count}</p>
    </div>
  )
}

export default Counter