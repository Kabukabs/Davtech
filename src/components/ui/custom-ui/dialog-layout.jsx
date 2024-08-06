import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../dialog';
import { Button } from '../button';
import React from 'react';
import { useAppContext } from '@/lib/context/app.context';

export const ModalWrapper = ({
  children,
  bigscreenwidth,
  title,
  trigger,
  description,
  scrollable = false,
  bg,
}) => {
  const { modalCloseTrigger } = useAppContext();
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
      //Prevent modal from closing once its clicked elsewhere apart from the close button
        onInteractOutside={(e) => e.preventDefault()}
        className={`${bigscreenwidth ? bigscreenwidth : 'sm:max-w-[425px]'} ${
          scrollable ? 'overflow-y-scroll max-h-screen' : null
        } ${bg ? bg : 'bg-white'}`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter className="sm:justify-start hidden">
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-white text-white"
              ref={modalCloseTrigger}
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
