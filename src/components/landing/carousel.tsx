// components/IndustryCarousel.tsx
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
      if (!sectionRef.current || !containerRef.current || !trackRef.current) return;

      // Calculate track width
      const cardWidth = 420; // lg:w-[420px]
      const gap = 20; // gap-5
      const totalWidth = industries.length * (cardWidth + gap);

      // Set track width
      gsap.set(trackRef.current, { width: totalWidth });

      // Create horizontal scroll animation
      const scrollTween = gsap.to(trackRef.current, {
        x: () => -(totalWidth - window.innerWidth),
        ease: "none"
      });

      // ScrollTrigger for horizontal scroll
            ScrollTrigger.create({
              id: "horizontal-carousel",
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${totalWidth}`,
              pin: true,
              scrub: 1,
              animation: scrollTween,
              onUpdate: (self) => {
                // Parallax effects based on scroll position
                const cards = gsap.utils.toArray<HTMLElement>(".carousel-card");
                cards.forEach((card, index) => {
                  const rect = card.getBoundingClientRect();
                  const centerX = rect.left + rect.width / 2;
                  const distanceFromCenter = (centerX - window.innerWidth / 2) / window.innerWidth;
                  const absDistance = Math.abs(distanceFromCenter);
                  
                  // Scale and opacity based on distance from center
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
      
                  // Image parallax
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

      // Draggable for touch/mouse drag
            const draggable = Draggable.create(trackRef.current, {
              type: "x",
              bounds: { minX: -(totalWidth - window.innerWidth), maxX: 0 },
              inertia: true,
              dragResistance: 0.2,
              onDrag: function() {
                // Sync ScrollTrigger progress with draggable position
                const progress = Math.abs(this.x) / (totalWidth - window.innerWidth);
                const st = ScrollTrigger.getById("horizontal-carousel");
                if (st) {
                  const end = typeof st.end === "number" ? st.end : (typeof st.start === "number" ? st.start : 0);
                  st.scroll(progress * end);
                }
              },
              onThrowUpdate: function() {
                const progress = Math.abs(this.x) / (totalWidth - window.innerWidth);
                const st = ScrollTrigger.getById("horizontal-carousel");
                if (st) {
                  const end = typeof st.end === "number" ? st.end : (typeof st.start === "number" ? st.start : 0);
                  st.scroll(progress * end);
                }
              }
            })[0];

      return () => {
        draggable.kill();
      };
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
            <div 
              ref={trackRef}
              className="absolute top-0 left-0 flex gap-5 px-4 lg:px-10 h-full"
              style={{ 
                width: 'fit-content',
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
