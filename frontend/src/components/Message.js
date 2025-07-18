
import React from 'react';
import { motion } from 'framer-motion';

function Message({ type, text }) {
  const isUser = type === 'user';

  return (
    <motion.div
      className={`p-3 rounded-lg max-w-[80%] \${isUser ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-300 dark:bg-gray-700 dark:text-white'}`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {text}
    </motion.div>
  );
}

export default Message;
