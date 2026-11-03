import Image from 'next/image';
import React from 'react';

const galleryItems = [
  {
    id: 1,
    tag: 'WARMTH FOR ALL',
    title: 'Winter Clothes Drive',
    location: 'Mirpur 10, Dhaka',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 2,
    tag: 'VULNERABLE NIGHT SUPPORT',
    title: 'Night Blanket Relief',
    location: 'Mohakhali, Dhaka',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 3,
    tag: 'ECO CLEANUP',
    title: 'Dhanmondi Lake Clean-up',
    location: 'Dhanmondi, Dhaka',
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 4,
    tag: 'GREEN EARTH INITIATIVE',
    title: 'Urban Tree Plantation',
    location: 'Uttara, Dhaka',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 5,
    tag: 'FRESH MEALS SHARING',
    title: 'Community Food Relief',
    location: 'Old Dhaka',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 6,
    tag: 'EDUCATION FOR UNDERPRIVILEGED',
    title: 'Children Book & Bag Drive',
    location: 'Rampura, Dhaka',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop',
  },
];

const gallerySection = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-emerald-500 font-semibold tracking-widest text-xs uppercase">
            VISUAL STORIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-3">
            Community in Action
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto">
            Moments from volunteer drives, relief distributions, and green initiatives across Dhaka and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="relative group h-64 rounded-2xl overflow-hidden shadow-md cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            >
             
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={400}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
                
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

              <div className="absolute top-4 left-4">
                <span className="bg-emerald-400/90 text-emerald-950 font-bold text-[10px] px-2.5 py-1 rounded-md tracking-wider uppercase backdrop-blur-xs">
                  {item.tag}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-bold mb-1 drop-shadow-sm">
                  {item.title}
                </h3>
                <div className="flex items-center text-xs text-slate-300">
                  <svg
                    className="w-3.5 h-3.5 mr-1 text-slate-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default gallerySection;