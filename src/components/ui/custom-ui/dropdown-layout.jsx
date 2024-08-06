'use client';
import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSubTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from '../dialog';
import { AiOutlineMore } from 'react-icons/ai';
import { Button } from '../button';

export const DropdownLayout = ({ menu, label, trigger }) => {
  const [dialogChild, setDialogChild] = React.useState (null);
  return (
    <Dialog>
      <DropdownMenu>
        //Dropdown Trigger
        <DropdownMenuTrigger asChild>
          {trigger ? (
            trigger
          ) : (
            <div className="cursor-pointer">
              <AiOutlineMore size="1.3rem" />
            </div>
          )}
        </DropdownMenuTrigger>
        //Dropdown Label
        <DropdownMenuContent className="w-56">
          {label && (
            <DropdownMenuLabel className="bg-lightgrey">
              {label}
            </DropdownMenuLabel>
          )}
          <DropdownMenuGroup>
            {menu.map((men, index) => {
              const { title, action, subTitles, modalNode } = men;
              if (subTitles) {
                //Check if the dropdown has another dropdown
                return (
                  <DropdownMenuSub key={index}>
                    <DropdownMenuSubTrigger className="hover:!text-black hover:!bg-blue w-full justify-between">
                      <span>{title}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {subTitles.map((sub, index) => {
                          //if the dropdown has another dropdown; return the inner dropdown else return normal dropdown
                          if (sub.modalNode) {
                            return (
                              <DialogTrigger asChild key={index}>
                                <DropdownMenuItem
                                  key={index}
                                  onClick={() => setDialogChild(sub.modalNode)}
                                >
                                  <span>{sub.title}</span>
                                </DropdownMenuItem>
                              </DialogTrigger>
                            );
                          } else {
                            return (
                              <DropdownMenuItem
                                key={index}
                                onClick={sub.action}
                              >
                                <span>{sub.title}</span>
                              </DropdownMenuItem>
                            );
                          }
                        })}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                );
              } else {
                if (modalNode) {
                  //Check if the dropdown is a pop up modal
                  return (
                    <DialogTrigger asChild key={index}>
                      <DropdownMenuItem
                        key={index}
                        className="hover:!text-black hover:!bg-blue"
                        onClick={() => setDialogChild(modalNode)}
                      >
                        <span>{title}</span>
                      </DropdownMenuItem>
                    </DialogTrigger>
                  );
                } else {
                  return (
                    <DropdownMenuItem
                      key={index}
                      className="hover:!text-black hover:!bg-blue"
                      onClick={action}
                    >
                      {title}
                    </DropdownMenuItem>
                  );
                }
              }
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className={'sm:max-w-[425px] bg-white'}
      >
        {dialogChild}
        <DialogFooter className="sm:justify-start hidden">
          <DialogClose asChild>
            <Button type="button" className="bg-white text-white">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
