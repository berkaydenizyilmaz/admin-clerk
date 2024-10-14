"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddACategory from "@/components/ui/AddACategory";
import UpdateCategory from "@/components/UpdateCategory";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mt-4 mb-8">Categories</h1>

      <AddACategory fetchCategories={fetchCategories} />

      {selectedCategory && isUpdateDialogOpen && (
        <UpdateCategory
          fetchCategories={fetchCategories}
          category={selectedCategory}
          isOpen={isUpdateDialogOpen}
          onClose={() => setIsUpdateDialogOpen(false)}
        />
      )}

      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="lg:w-[900px] w-[150px]">
              Description
            </TableHead>
            <TableHead className="text-right">#</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.id}</TableCell>
              <TableCell>{category.title} </TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell className="text-right flex flex-row gap-2">
                <Button
                  onClick={() => {
                    setSelectedCategory(category), setIsUpdateDialogOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={() => deleteCategory(category.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
