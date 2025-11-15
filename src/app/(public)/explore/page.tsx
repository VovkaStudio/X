import { Suspense } from "react";
import Explore from "./Explore";

export default function page() {
  return (
    <div>
        <Suspense>
        <Explore />
        </Suspense>
    </div>
  )
}