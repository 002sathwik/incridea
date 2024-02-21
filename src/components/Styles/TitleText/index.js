import { textVariant2 } from "@/utils/motion";
import { motion } from 'framer-motion';

export default function TitleText({textStyles,title}) {
  return (
    <motion.h2
      variants={textVariant2}
      initial="hidden"
      whileInView="show"
      className={`mt-[8px] font-bold md:text-[64px] text-[40px] text-white ${textStyles}`}
    >
      {title}
    </motion.h2>
  );
}
