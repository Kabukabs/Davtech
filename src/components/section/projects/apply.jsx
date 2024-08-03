import { Button } from '@/components/ui/button';
import camera from '/carbon_camera.svg';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Text } from '@/components/ui/custom-ui/text';
import { ApplySchema } from '../../../lib/schemas';
import { UploadWrapper } from '../../common/upload';

export const ApplyForJob = () => {
  const form = useForm({
    resolver: zodResolver(ApplySchema),
    defaultValues: {
      mail: '',
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div>
      <div classname="max-w-[1540px] flex flex-col gap-4">
        <Text
          as="h6"
          style=" text-center text-blue md:text-2xl font-extrabold border-b-2 border-blue mb-8 w-fit m-auto"
        >
          APPLY
        </Text>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col mt-4 gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <div className="flex gap-2">
                    <FormLabel className="md:text-md text-sm w-[7rem]">
                      Name:
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="enter your name"
                        {...field}
                        type="text"
                        required
                        className="w-full"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <div className="flex gap-2">
                    <FormLabel className="md:text-md text-sm w-[7rem]">
                      Email:
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="enter your email"
                        {...field}
                        type="email"
                        required
                        className="w-full"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <FormLabel className="md:text-md text-sm w-[7rem]">
                UPLOAD CV:
              </FormLabel>
              <UploadWrapper
                handleUpload={(e) => console.log(e)}
                style={'w-full'}
              >
                <div className="border rounded-md p-4 w-full flex items-center justify-center">
                  <img
                    src={camera}
                    alt="object not found"
                    className="w-[4rem]"
                  />
                </div>
              </UploadWrapper>
            </div>
            <Button type="submit" className="bg-blue text-white ms-auto">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
