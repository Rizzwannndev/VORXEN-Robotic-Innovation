import Decode from "../components/Decode";
import { PrimaryAction } from "../components/Action";

const NotFound = () => (
  <main className="flex min-h-svh flex-col items-start justify-center px-5 pt-28 pb-20 sm:px-8 lg:px-12">
    <p className="t-label text-warn">[ERR] Route not in memory</p>
    <h1 className="mt-6 font-display text-[clamp(4rem,18vw,6rem)] leading-none text-phos">
      <Decode text="404" duration={900} />
    </h1>
    <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-dim">
      The system has no record of this address. It may have moved, or it never existed.
    </p>
    <div className="mt-10">
      <PrimaryAction to="/">
        Return to core
      </PrimaryAction>
    </div>
  </main>
);

export default NotFound;
