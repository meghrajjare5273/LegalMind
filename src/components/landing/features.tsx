import React from "react";

const SplitFeature = () => {
  return (
    <section className="relative w-full px-4 lg:px-10 pb-10 text-black">
      <div className="relative z-10 mx-auto w-full max-w-[1440px]">
        <div className="flex gap-2 md:gap-5 flex-col md:flex-row">
          <div className="relative overflow-hidden rounded-lg h-64 md:h-[560px] md:flex-[1.53] aspect-[9/10] md:aspect-[3/2]">
            <img
              alt="Background"
              className="absolute inset-0 h-full w-full object-cover"
              src="https://cdn.sanity.io/images/rjtqmwfu/web3-prod/674bd9eea7ebfbfef632d242ca4ecf0684e67ba9-1800x1120.png"
            />
          </div>
          <div className="relative overflow-hidden rounded-lg h-64 md:h-[560px] md:flex-[0.75] aspect-[4/9] md:aspect-[7/10]">
            <img
              alt="Person working"
              className="h-full w-full object-cover"
              src="https://cdn.sanity.io/images/rjtqmwfu/web3-prod/6a23f452af56a83a1611bba56b026e1842d0c2fb-880x1120.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitFeature;