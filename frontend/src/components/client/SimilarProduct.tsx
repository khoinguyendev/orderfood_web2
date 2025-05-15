import ItemSimilarProduct from "./ItemSimilarProduct";

const a = [1, 2, 3, 4];
const SimilarProduct = () => {
  return (
    <div>
      <h2 className="border-b-primary border-b-4 ">
        <button className="bg-primary text-white px-5 py-2 font-bold rounded-t-lg">Sản phẩm tương tự</button>
      </h2>
      <div className="flex flex-col">
        {a.map((index) => (
          <ItemSimilarProduct key={index} />
        ))}
      </div>
    </div>
  );
};

export default SimilarProduct;
