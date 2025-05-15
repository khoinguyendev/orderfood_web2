import { Link } from "react-router-dom";
import { urlImage } from "../../util/Format";

const ItemCategory = ({ item }: { item: any }) => {
  return (
    <Link to={`/danh-muc/${item.id}`} key={item.id} className="flex flex-col items-center group">
      <div className="overflow-hidden rounded">
        <img className="w-[285px] h-[176px] object-cover rounded transition-transform origin-center duration-300 scale-100 group-hover:scale-110" src={urlImage(item.image)} alt={item.name} />
      </div>
      <p className="text-center mt-2 text-gray1 font-bold text-[15px]">{item.name}</p>
    </Link>
  );
};

export default ItemCategory;
