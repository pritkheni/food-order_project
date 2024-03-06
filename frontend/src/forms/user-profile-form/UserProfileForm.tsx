import { z } from "zod";

const updateUserValidation = z.object({
  email: z.string().optional(),
  name: z.string().min(1, { message: "name can not be empty" }),
  addressLine1: z.string().min(1, { message: "address can not be empty" }),
  city: z.string().min(1, { message: "city can not be empty" }),
  country: z.string().min(1, { message: "country can not be empty" }),
});

export type UserFormData = z.infer<typeof updateUserValidation>;

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { useEffect } from "react";

type Props = {
  onSave: (userProfileData: UserFormData) => void;
  isLoagin: boolean;
  currentUser: User;
  title?: string;
  buttonText?: string;
};

export default function UserProfileForm({
  onSave,
  isLoagin,
  currentUser,
  buttonText = "Submit",
  title = "User Profile",
}: Props) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(updateUserValidation),
    defaultValues: currentUser,
  });
  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className=" flex-1 space-y-4 bg-gray-50 rounded-lg md:p-10"
      >
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <FormDescription>
            View and change your profile information here
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white"></Input>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white"></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>AddressLine1</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white"></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white"></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white"></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isLoagin ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="bg-orange-500">
            {buttonText}
          </Button>
        )}
      </form>
    </Form>
  );
}
