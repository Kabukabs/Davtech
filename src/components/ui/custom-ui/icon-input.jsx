import { Input } from '@/components/ui/input';
export const IconInput = ({
  icon,
  placeHolder,
  handleChange,
  type,
  style,
  category,
  defaultValue,
  field,
}) => {
  return (
    <div className="relative">
      <span className="absolute top-[0.7rem] left-[0.5rem] z-50">{icon}</span>
      <span>
        {category === 'formInput' ? (
          <Input
            required
            placeholder={placeHolder}
            {...field}
            type={type}
            className={`${style ? style : ''} ps-[2.2rem] py-[0.6rem]`}
            defaultValue={defaultValue}
          />
        ) : (
          <Input
            required
            placeholder={placeHolder}
            type={type}
            onChange={handleChange}
            defaultValue={defaultValue}
            className={`${style ? style : ''} ps-[2rem] py-[0.6rem]`}
          />
        )}
      </span>
    </div>
  );
};
