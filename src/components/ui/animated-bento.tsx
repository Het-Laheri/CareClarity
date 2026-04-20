'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export function AnimatedBento({
    className,
    delay = 0,
    children
}: {
    className?: string;
    delay?: number;
    children: ReactNode;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98] // Premium spring-like ease
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={cn(
                "relative group overflow-hidden rounded-3xl border bg-background/50 backdrop-blur-sm p-8 shadow-sm transition-all hover:shadow-xl hover:border-primary/30",
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 h-full flex flex-col">
                {children}
            </div>
        </motion.div>
    );
}
