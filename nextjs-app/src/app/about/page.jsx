import Link from "next/link";
import React from "react";
import image from "@/images/mountain.jpeg";
import Image from "next/image";
import Counter from "@/component/Counter";

function aboutPage() {
  return (
    <div className="flex flex-col items-center justify-center bg-fuchsia-700 min-h-screen">
      <Counter />
      <p className="text-white text-xl my-4">aboutPage</p>

      {/* Example using local image if needed */}
      {/* <Image src={image} alt="Mountain" width={384} height={384} className="rounded-xl" /> */}

      {/* External image using fill */}
      <div className="relative w-80 h-96 mb-6"> {/* relative is required for fill */}
        <Image
          src="https://images.unsplash.com/photo-1743448748313-80eb7f9eb2b7?q=80&w=1206&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Mountain"
          fill
          className="object-cover rounded-xl"
        />
      </div>

      <Link href="/about/sagar" className="text-2xl text-white underline">
        Sagar Page
      </Link>
    </div>
  );
}

export default aboutPage;
