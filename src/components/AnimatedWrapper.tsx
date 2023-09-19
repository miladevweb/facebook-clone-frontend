'use client'

import { AnimatePresence, motion } from 'framer-motion';

export const AnimatedWrapper = ({ children }: { children: React.ReactNode }) => {
   return (
      <>
         <AnimatePresence>
            <motion.div
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 15 }}
               transition={{ delay: 0.5 }}
            >
               {children}
            </motion.div>
         </AnimatePresence>
      </>
   );
};
