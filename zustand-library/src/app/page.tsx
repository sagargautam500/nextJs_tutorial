"use client"
import { useCounter } from "@/store/useCounter";

export default function Home() {
  const{count,increment,decrement}=useCounter();
  return (
   <div className=" min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8" >
    <h1 className=" text-4xl text-center  mb-4">Zustand Example</h1>
    <p className=" text-2xl text-center mb-10">Welcome to the Zustand state management example page!</p>
    <div className=" max-w-md mt-1 mx-auto p-10 border rounded shadow" >
      <p className=" text-4xl text-center mb-10" > count={count}</p>
      <div className=" flex justify-center gap-4" >
        <button onClick={increment} className=" bg-blue-500 text-white px-4 py-2 rounded" >Increment</button>
        <button onClick={decrement} className=" bg-red-500 text-white px-4 py-2 rounded">Decrement</button>
      </div>
    </div>
   </div>
  );
}
