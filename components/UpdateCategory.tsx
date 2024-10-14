"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import axios from "axios";

const formSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
});

interface UpdateCategoryProps {
  fetchCategories: () => void;
  isOpen: boolean;
  onClose: () => void;
  category: {
    id: string;
    title: string;
    description: string;
  };
}

const UpdateCategory = ({
  fetchCategories,
  category,
  isOpen,
  onClose,
}: UpdateCategoryProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: category.title,
      description: category.description,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.put(`/api/categories/${category.id}`, {
        title: values.title,
        description: values.description,
      });
      fetchCategories();
      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger>
          <Button>Edit a Category</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit A Category</DialogTitle>
            <DialogDescription>
              Edit the category from the list
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="title" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the title of the category
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="description" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the description of the category
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateCategory;
