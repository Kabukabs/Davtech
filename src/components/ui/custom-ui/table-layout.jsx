'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const TableLayout = ({
  emptyState,
  dataLength,
  tableHeadRow,
  tableHeadRowStyle,
  tableStyle,
  children,
  tableHeadRowChildren,
  caption,
  tableHead,
}) => {
  return (
    <div className="p-0 md:p-4 w-full text-darkblue font-medium overflow-auto">
      <div className="my-4">{tableHead}</div>
      <Table className={tableStyle}>
        {caption && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          {tableHeadRowChildren ? (
            tableHeadRowChildren
          ) : (
            <TableRow
              className={
                tableHeadRowStyle
                  ? tableHeadRowStyle
                  : 'font-light text-sm bg-white border-none shadow rounded-md'
              }
            >
              {tableHeadRow?.map((heading, index) => (
                <TableHead key={index}>{heading}</TableHead>
              ))}
            </TableRow>
          )}
        </TableHeader>
        <TableBody className="font-light text-xs">{children}</TableBody>
      </Table>
      {/** Show EmptyState when data is not empty */}
      {dataLength < 1 && (
        <div className="flex flex-col items-center justify-center my-[3rem] text-darkblue m-auto ">
          {emptyState}
        </div>
      )}
    </div>
  );
};
