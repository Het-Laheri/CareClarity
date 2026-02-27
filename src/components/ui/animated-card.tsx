'use client';

import { motion } from 'framer-motion';
import { Card } from './card';
import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import { cn } from '@/lib/utils';

const AnimatedCard = forwardRef<
    HTMLDivElement,
    ComponentPropsWithoutRef<typeof Card>
>(({ className, children, ...props }, ref) => {
    return (
        <motion.div
            ref={ref}
            whileHover={{
                y: -6,
                transition: { duration: 0.25, ease: 'easeOut' },
            }}
            whileTap={{ scale: 0.98 }}
        >
            <Card
                className={cn(
                    'transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10',
                    className
                )}
                {...props}
            >
                {children}
            </Card>
        </motion.div>
    );
});

AnimatedCard.displayName = 'AnimatedCard';

export { AnimatedCard };
