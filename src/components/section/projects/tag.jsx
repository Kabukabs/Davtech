import { Text } from '../../ui/custom-ui/text';
import { motion } from 'framer-motion';

export const Tag = ({ title, align }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Text
        as="h5"
        style={`text-md font-semibold text-blue ${
          align ? `text-${align}` : 'text-start'
        }`}
      >
        {title.toUpperCase()}
      </Text>
    </motion.div>
  );
};
