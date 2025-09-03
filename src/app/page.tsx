import { Hero } from "@/components/common/hero"
import { Grid } from "@/components/common/grid"

export default function Home() {
  return (
    <div className="relative block font-sans overflow-hidden h-screen">
      <Grid
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className="fixed inset-0 h-full w-full z-0"
      />
      <div className="relative z-10">
        <Hero />
      </div>
    </div>
  );
}