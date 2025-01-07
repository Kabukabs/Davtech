import { Text } from '../ui/custom-ui/text'; // Importing a custom Text component from the specified path.
import { motion } from 'framer-motion'; // Importing Framer Motion for animation purposes.

export const Tag = ({ title, align }) => { // Creating a functional component named "Tag" that accepts 'title' and 'align' as props.
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }} // Setting the initial state of the animation, where the element starts off with 0 opacity and 80% of its scale.
      animate={{ opacity: 1, scale: 1 }} // Defining the final animated state, where the element fully appears (opacity: 1) and grows to its full size (scale: 1).
      transition={{ duration: 0.3 }} // Specifying the duration of the animation, which is 0.3 seconds.
    >
      <Text
        as="h5" // The Text component is rendered as an h5 HTML element.
        style={`text-md font-semibold text-blue ${
          align ? `text-${align}` : 'text-start' // If 'align' prop is provided, the text alignment class is dynamically applied. Otherwise, the text aligns to the start by default.
        }`}
      >
        {title.toUpperCase() /* The title is converted to uppercase and displayed as the content of the Text component */}
      </Text>
    </motion.div>
  );
};
