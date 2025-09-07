import { Button } from "@/components/ui/button";

export default function Home() {
  return (
     <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-500">
        <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
        <p className="mt-4 text-lg">This is a simple Next.js application.</p>
        <Button className="mt-4 bg-amber-50">Login</Button> 
        <Button className="mt-4 bg-amber-50">Register</Button>
        
      </div>
    </>
  );
}
