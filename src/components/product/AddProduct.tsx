import { useState } from "react";
import { ChevronDown, Minus, Plus, Upload } from "lucide-react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveProduct } from "../../ServiceLayer/ProductStorage";
import { useForm } from "react-hook-form";
import {
  ProductSchema,
  // type ProductListSchema,
  type Product,
} from "../../schema/ProductSchema";

const AddProduct = () => {
  const [stock, setStock] = useState(1);

  const [images, setImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      category: "",
      brand: "",
      price: undefined,
      stock: undefined,
      imageUrl: "",
    },
  });

  //ONSUBMIT FUNCTION
  const onSubmit = (data: Product) => {
    console.log("Product submitted:", data);
    saveProduct(data);
    reset();
    setStock(1);
    setImages([]);
  };

  //styles
  const inputClass =
    "h-12 w-full rounded-md border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-blue-500 transition-colors";

  const selectClass =
    "h-12 w-full appearance-none rounded-xl border border-border bg-background px-4 pr-10 text-sm text-foreground outline-none focus:border-blue-500 transition-colors";

  const labelClass = "block text-sm font-medium text-foreground mb-1.5";

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    setImages((prev) => [...prev, ...Array.from(files)]);
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      {/* Products Description */}

      <Card className="w-full rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6 border-b w-full pb-3">
          Products Description
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Product Name</label>

            <input
              type="text"
              placeholder="Enter product name"
              {...register("name")}
              className={inputClass}
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="relative">
            <label className={labelClass}>Category</label>

            <select
              {...register("category")}
              className={selectClass}
              defaultValue=""
            >
              <option value="" disabled>
                Select a category
              </option>

              <option value="electronics">Electronics</option>
              <option value="apparel">Apparel</option>
              <option value="home">Home & Living</option>
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-4 top-[42px] text-muted-foreground"
            />

            {errors.category && (
              <p className="mt-1 text-sm text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label className={labelClass}>Brand</label>

            <select
              {...register("brand")}
              className={selectClass}
              defaultValue=""
            >
              <option value="" disabled>
                Select brand
              </option>

              <option value="apple">Apple</option>
              <option value="samsung">Samsung</option>
              <option value="sony">Sony</option>
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-4 top-[42px] text-muted-foreground"
            />

            {errors.brand && (
              <p className="mt-1 text-sm text-red-500">
                {errors.brand.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label className={labelClass}>Color</label>
            <select className={selectClass} defaultValue="">
              <option value="" disabled>
                Select color
              </option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="blue">Blue</option>
            </select>
            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-4 top-[42px] text-muted-foreground"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <label className={labelClass}>Weight(KG)</label>
            <input type="text" placeholder="15" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Length(CM)</label>
            <input type="text" placeholder="120" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Width(CM)</label>
            <input type="text" placeholder="23" className={inputClass} />
          </div>
        </div>

        <div className="mt-6">
          <label className={labelClass}>Description</label>
          <textarea
            placeholder="Receipt Info (optional)"
            rows={4}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-blue-500 resize-y transition-colors"
          />
        </div>
      </Card>

      {/* Pricing & Availability */}
      <Card className="w-full rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">
          Pricing & Availability
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={labelClass}>Price</label>

            <input
              type="number"
              placeholder="Enter price"
              {...register("price", {
                valueAsNumber: true,
              })}
              className={inputClass}
            />

            {errors.price && (
              <p className="mt-1 text-sm text-red-500">
                {errors.price.message}
              </p>
            )}
          </div>
          <div>
            <label className={labelClass}>Length(CM)</label>
            <input type="text" placeholder="120" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Width(CM)</label>
            <input type="text" placeholder="23" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="felx">
            <label className={labelClass}>Stock Quantity</label>
            <div className="flex items-center h-12  justify-between w-full rounded-xl border border-border bg-background overflow-hidden">
              <button
                type="button"
                onClick={() => setStock((s) => Math.max(0, s - 1))}
                className="h-full px-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Minus size={16} />
              </button>
              <h1>{stock}</h1>
              <button
                type="button"
                onClick={() => setStock((s) => s + 1)}
                className="h-full px-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="relative">
            <label className={labelClass}>Availability Status</label>

            <select
              {...register("stock")}
              className={selectClass}
              defaultValue=""
            >
              <option value="" disabled>
                Select Availability
              </option>

              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Pre-order">Pre-order</option>
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-4 top-[42px] text-muted-foreground"
            />

            {errors.stock && (
              <p className="mt-1 text-sm text-red-500">
                {errors.stock.message}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Products Images */}
      <Card className="w-full rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">
          Products Images
        </h2>

        <div
          className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-4 py-14 text-center cursor-pointer transition-colors 
           
              border-blue-400 dark:border-blue-500/60"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background">
            <Upload size={20} className="text-foreground" />
          </div>

          <p className="text-sm text-foreground">
            <span className="font-semibold">Click to upload</span>{" "}
            <span className="text-muted-foreground">
              or drag and drop SVG, PNG, JPG or GIF (MAX. 800x400px)
            </span>
          </p>

          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((file, i) => (
              <div
                key={`${file.name}-${i}`}
                className="aspect-video rounded-lg border border-border overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-end items-stretch sm:items-center gap-4">
          <Button
            variant="outline"
            className="h-12 rounded-md bg-[#FFFFFF] font-medium text-black hover:bg-[#3f4b8c] dark:text-foreground"
          >
            Draft
          </Button>
          <Button
            className="h-12 rounded-md bg-[#475FFF] hover:bg-[#3f4b8c] text-white"
            type="submit"
          >
            Publish Product
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default AddProduct;
