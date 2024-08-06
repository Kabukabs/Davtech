import ReactPaginate from 'react-paginate';

export const Pagination = () => {
  const handlePageClick = (event) => {
    let page_number = event.selected + 1;
    console.log(page_number);
  };

  const pagination_Style = {
    nextLabel: '>',
    previousLabel: '< ',
    containerClassName: 'flex w-fit border border-dashed m-auto my-8 gap-2 p-2 rounded-md',
    activeClassName: 'border border-blue text-blue rounded-md',
    previousClassName: ' text-white bg-grey px-[0.8rem] py-[0rem] h-[2rem] rounded-md flex flex-col justify-center',
    nextClassName: ' text-grey border px-[0.8rem] py-[0rem] h-[2rem] rounded-md flex flex-col justify-center',
    pageClassName: 'px-[0.8rem] py-[0rem] h-[2rem] text-xs rounded-md flex flex-col justify-center border text-grey',
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={pagination_Style.nextLabel}
      onPageChange={handlePageClick}
      pageRangeDisplayed={4}
      pageCount={2}
      initialPage={1}
      disableInitialCallback={true}
      previousLabel={pagination_Style.previousLabel}
      renderOnZeroPageCount={null}
      containerClassName={pagination_Style.containerClassName}
      activeClassName={pagination_Style.activeClassName}
      previousClassName={pagination_Style.previousClassName}
      nextClassName={pagination_Style.nextClassName}
      pageClassName={pagination_Style.pageClassName}
    />
  );
};
