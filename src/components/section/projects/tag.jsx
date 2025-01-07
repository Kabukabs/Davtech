import { Text } from '../../ui/custom-ui/text';

export const Tag = ({ title, align }) => {
  return (
    <Text
      as="h5"
      style={`text-md font-semibold text-blue ${
        align ? `text-${align}` : 'text-start'
      }`}
    >
      {title.toUpperCase()}
    </Text>
  );
};
