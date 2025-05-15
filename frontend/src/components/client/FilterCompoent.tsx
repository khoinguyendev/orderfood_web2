import React, { useState } from "react";
import { ICategory } from "../../types/Category";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import toast from "react-hot-toast";

const FilterCompoent = React.memo(({ categories }: { categories: ICategory[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(50000);
  const fetchFilteredProducts = async () => {
    if (selectedCategories.length == 0) {
      toast.error("Vui lòng chọn ít nhất 1 danh mục");
      return;
    }
    if (min >= max) {
      toast.error("Giá tối thiểu không được lớn hơn giá tối đa");
      return;
    }
    // const response = await axios.post(`${SERVER_HOST}/products/filter`, {
    //   categoryIds: selectedCategories, // Lọc theo category id 1 và 2
    //   minPrice: 0,
    //   maxPrice: 50000,
    // });
    setIsOpen(false); // Đóng Sheet trước khi chuyển trang
    const ids = selectedCategories.join(",");
    setTimeout(() => {
      navigate(`/bo-loc-san-pham?ids=${ids}&minPrice=${min}&maxPrice=${max}`);
    }, 300); // Delay nhỏ để tránh giật lag
  };
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const handleCategoryChange = (category: number) => {
    setSelectedCategories((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]));
  };
  return (
    <Sheet open={isOpen} modal={true} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-auto" onClick={() => setIsOpen(true)}>
          <Filter className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[400px] max-w-full bg-white shadow-lg">
        <SheetHeader>
          <SheetTitle>Bộ lọc</SheetTitle>
          <SheetDescription>Filter menu items by category</SheetDescription>
        </SheetHeader>
        <div className="p-4 overflow-y-auto h-[calc(100vh-120px)]">
          {/* Danh mục */}
          <h3 className="font-medium mb-2">Danh mục</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox id={category.name} checked={selectedCategories.includes(category.id)} onCheckedChange={() => handleCategoryChange(category.id)} />
                <Label htmlFor={category.name}>{category.name}</Label>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          {/* Khoảng giá */}
          <h3 className="font-medium mb-2">Khoảng giá</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="min-price">Min Price</Label>
              <Input value={min} onChange={(e) => setMin(Number(e.target.value))} id="min-price" type="number" placeholder="0" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="max-price">Max Price</Label>
              <Input value={max} onChange={(e) => setMax(Number(e.target.value))} id="max-price" type="number" placeholder="50" className="mt-1" />
            </div>
          </div>

          {/* Hành động */}
          <div className="mt-6 flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategories([]);
                setMin(0);
                setMax(50000);
              }}
            >
              Reset
            </Button>
            <Button onClick={fetchFilteredProducts} disabled={selectedCategories.length === 0}>
              Tìm
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
});

export default FilterCompoent;
