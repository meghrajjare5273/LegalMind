import Image from "next/image";
import Person from "#/assets/person-working.jpg"
import Grad8 from "#/assets/grad-8.jpg"



const SplitFeature = () => {
  return (
    <section className="relative w-full px-4 lg:px-10 pb-10 text-black">
      <div className="relative z-10 mx-auto w-full max-w-360">
        <div className="flex gap-2 md:gap-5 flex-col md:flex-row">
          <div className="relative overflow-hidden rounded-lg h-64 md:h-140 md:flex-[1.53] aspect-9/10 md:aspect-3/2">
            <Image
              alt="Background"
              className="absolute inset-0 h-full w-full object-cover"
              src={Grad8}
              height={560}
              width={560}
            />
          </div>
          <div className="relative overflow-hidden rounded-lg h-64 md:h-140 md:flex-[0.75] aspect-4/9 md:aspect-7/10">
            <Image
              alt="Person working"
              className="h-full w-full object-cover"
              src={Person}
              height={500}
              width={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitFeature;