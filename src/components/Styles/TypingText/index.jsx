'use client';

import { motion } from 'framer-motion';
import { textContainer, textVariant2 } from "@/utils/motion";

export default  function TypingText({ title, textStyles }){
    return(
        <motion.p
        variants={textContainer}
        className={`font-normal text-[34px] text-white ${textStyles}`}
      >
        {Array.from(title).map((letter, index) => (
          <motion.span variants={textVariant2} key={index}>
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.p>
    )
}

