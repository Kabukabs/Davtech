export const UploadWrapper=({
  handleUpload,
  children,
  style
}) => {
  return (
    <div className={style?style:null}>
      <label htmlFor="icon" className="w-fit cursor-pointer">
        {children}
      </label>
      <input
        name="icon"
        id="icon"
        type="file"
        multiple
        onChange={(e) => handleUpload(e)}
        className="hidden"
      />
    </div>
  );
};
