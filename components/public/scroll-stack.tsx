'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const cards = [
  { id: 1, title: 'Card One' },
  { id: 2, title: 'Card Two' },
  { id: 3, title: 'Card Three' },
  { id: 4, title: 'Card Four' },
];

export default function StackCards() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      {cards.map((card, index) => {
        // 🔥 reverse order (first goes down first)
        const reversedIndex = cards.length - index - 1;

        const start = reversedIndex * 0.2;
        const end = start + 0.4;

        // ✅ ONLY vertical movement (no scaling)
        const y = useTransform(scrollYProgress, [start, end], [0, -150]);

        return (
          <motion.div
            key={card.id}
            style={{
              y,
              zIndex: index + 1,
            }}
            className="sticky top-20 mx-auto w-[300px] h-[200px] bg-white rounded-2xl shadow-xl flex items-center justify-center"
          >
            <h2 className="text-xl font-bold">{card.title}</h2>
          </motion.div>
        );
      })}
    </div>
  );
}