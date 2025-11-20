// zustand-library/src/store/useCounter.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CounterProps={
    count:number;
    increment:()=>void;
    decrement:()=>void;
}

// export const useCounter=create<CounterProps>((set)=>(
//     {
//       count:0,
//       increment:()=>set((state)=>({count:state.count+1})),
//       decrement:()=>set((state)=>({count:state.count-1}))
//     }
// ));


export const useCounter = create<CounterProps>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
    }),
    { name: "counter-storage" }
  )
)