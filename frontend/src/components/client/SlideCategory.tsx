import { ICategory } from "../../types/Category";
import SwiperWrapper from "./SwiperWrapper";
import ItemCategory from "./ItemCategory";
import ItemCategorySkeleton from "./ItemCategorySkeleton";

const SlideCategory = ({ categories, isLoading }: { categories: ICategory[]; isLoading: boolean }) => {
  return (
    <SwiperWrapper
      slidesPerView={4}
      spaceBetween={20}
      loop={false}
      pagination={false}
      breakpoints={{
        0: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 4,
        },
      }}
    >
      {isLoading ? Array.from({ length: 4 }).map((_, i) => <ItemCategorySkeleton key={i} />) : categories.map((item) => <ItemCategory key={item.id} item={item} />)}
    </SwiperWrapper>
  );
};

export default SlideCategory;
