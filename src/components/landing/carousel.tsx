// src/components/landing/carousel.tsx
'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, Draggable);

const Card = ({ title, img, href }: { title: string; img: string; href: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const card = cardRef.current;
      if (!card) return;

      const onMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(card, {
          x: x * 0.05,
          y: y * 0.05,
          duration: 0.8,
          ease: "power2.out"
        });

        if (imageRef.current) {
          gsap.to(imageRef.current, {
            x: -x * 0.1,
            y: -y * 0.1,
            duration: 1.2,
            ease: "power2.out"
          });
        }
      };

      const onMouseLeave = () => {
        gsap.to(card, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        });

        if (imageRef.current) {
          gsap.to(imageRef.current, {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "power2.out"
          });
        }
      };

      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);

      return () => {
        card.removeEventListener('mousemove', onMouseMove);
        card.removeEventListener('mouseleave', onMouseLeave);
      };
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <Link 
      href={href} 
      className="inline-block focus:outline-none snap-center flex-shrink-0"
    >
      <div 
        ref={cardRef}
        className="group/card relative inline-flex h-[289px] w-[289px] md:h-[399px] md:w-[399px] lg:h-[420px] lg:w-[420px] cursor-pointer transition-transform duration-500 ease-in-out will-change-transform"
      >
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <img
            ref={imageRef}
            alt={title}
            className="h-full w-full rounded-xl object-cover transition-transform duration-300 ease-in-out group-hover/card:scale-110 will-change-transform"
            src={img}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 rounded-b-xl bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-between p-8">
          <p className="text-[20px] lg:text-[24px] font-medium text-white">{title}</p>
        </div>
      </div>
    </Link>
  );
};

const IndustryCarousel = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const industries = [
    {
      title: "Technology",
      href: "#",
      img: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/b5264330c568955041d465542469ebfdeb196547-840x840.jpg"
    },
    {
      title: "Financial Services",
      href: "#",
      img: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/30ec75e875e50726980c6a68a63b315b8503f1f7-840x840.jpg"
    },
    {
      title: "Healthcare",
      href: "#",
      img: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/871cc9ed4e63113205ab55e2a6cb207d8d32a2aa-840x840.jpg"
    },
    {
      title: "Manufacturing",
      href: "#",
      img: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/6ae6fc28f20cc442e8853d60392c50227a430992-840x840.jpg"
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      
      if (!track || !section) return;

      // Helper to calculate exact horizontal scroll distance
      // We read scrollWidth (real content width) - innerWidth (viewport)
      const getScrollAmount = () => {
        const amount = track.scrollWidth - window.innerWidth;
        // Safety check: if content fits on screen, amount is negative or 0.
        // In that case, we treat it as 0 to avoid bugs.
        return amount > 0 ? amount : 0;
      };

      // Create the main tween
      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      // Initialize ScrollTrigger
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        // The vertical scroll distance ('end') should match the horizontal distance
        // This creates a 1:1 "natural" feel (1px down = 1px right)
        end: () => `+=${getScrollAmount()}`,
        pin: true,
        scrub: 1, // High scrub creates smooth weight; use 'true' for instant lock
        animation: tween,
        invalidateOnRefresh: true, // IMPORTANT: Recalculates sizes on window resize
        onUpdate: (self) => {
             // --- Parallax Logic (unchanged from your original) ---
             const cards = gsap.utils.toArray<HTMLElement>(".carousel-card");
             cards.forEach((card) => {
               const rect = card.getBoundingClientRect();
               const centerX = rect.left + rect.width / 2;
               const distanceFromCenter = (centerX - window.innerWidth / 2) / window.innerWidth;
               const absDistance = Math.abs(distanceFromCenter);
               
               const scale = gsap.utils.clamp(0.8, 1, 1 - absDistance * 0.2);
               const opacity = gsap.utils.clamp(0.3, 1, 1 - absDistance * 0.5);
               
               gsap.to(card, {
                 scale: scale,
                 opacity: opacity,
                 filter: `blur(${absDistance * 2}px)`,
                 duration: 0.3,
                 ease: "power2.out",
                 overwrite: true
               });
   
               const image = card.querySelector("img");
               if (image) {
                 gsap.to(image, {
                   x: -distanceFromCenter * 30,
                   scale: 1 + absDistance * 0.1,
                   duration: 0.3,
                   ease: "power2.out",
                   overwrite: true
                 });
               }
             });
        }
      });

      // Draggable Integration
      // We must keep the Draggable bounds in sync with the dynamic width
      const draggable = Draggable.create(track, {
        type: "x",
        inertia: true,
        dragResistance: 0.2,
        // Bounds use numeric values (not functions) for TypeScript compatibility
        bounds: { 
          minX: -getScrollAmount(), 
          maxX: 0 
        },
        onDrag: function() {
           const maxScroll = getScrollAmount();
           if (maxScroll <= 0) return;
           
           // Calculate progress (0 to 1)
           const progress = Math.abs(this.x) / maxScroll;
           
           // Force the ScrollTrigger to match this progress
           const stInstance = ScrollTrigger.getById(st.vars.id as string);
           if (stInstance) {
             // map progress 0-1 to ScrollTrigger start-end
             const totalScroll = stInstance.end - stInstance.start;
             stInstance.scroll(stInstance.start + (progress * totalScroll));
           }
        },
        onThrowUpdate: function() {
            const maxScroll = getScrollAmount();
            if (maxScroll <= 0) return;
            
            const progress = Math.abs(this.x) / maxScroll;
            const stInstance = ScrollTrigger.getById(st.vars.id as string);
            if (stInstance) {
                const totalScroll = stInstance.end - stInstance.start;
                stInstance.scroll(stInstance.start + (progress * totalScroll));
            }
        }
      })[0];
      
      // Update Draggable bounds explicitly on refresh 
      // (ScrollTrigger calls refresh on resize automatically)
      ScrollTrigger.addEventListener("refresh", () => {
          if (draggable) draggable.applyBounds({
              minX: -getScrollAmount(),
              maxX: 0
          });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-background"
    >
      <div 
        ref={containerRef}
        className="absolute inset-0 flex items-center"
      >
        <div className="relative z-10 mx-auto w-full max-w-[1440px]">
          <div className="flex w-full items-end justify-between pb-10 px-4 lg:px-10">
            <h2 className="text-[24px] lg:text-[32px] font-medium max-w-[550px] text-foreground">
              Powering progress across industries
            </h2>
          </div>
          
          <div className="relative w-full h-[420px] overflow-hidden">
            {/* Remove fixed width: 'fit-content' is correct here.
               The JavaScript will measure this natural width.
            */}
            <div 
              ref={trackRef}
              className="absolute top-0 left-0 flex gap-5 px-4 lg:px-10 h-full w-max"
              style={{ 
                willChange: 'transform'
              }}
            >
              {industries.map((industry, index) => (
                <div 
                  key={index} 
                  className="carousel-card flex-shrink-0"
                >
                  <Card {...industry} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryCarousel;