import Bread from "../../components/client/Bread";
import DescriptionProduct from "../../components/client/DescriptionProduct";
import ProductImage from "../../components/client/ProductImage";
import ProductInfo from "../../components/client/ProductInfo";
import ProductSpecification from "../../components/client/ProductSpecification";
import SimilarProduct from "../../components/client/SimilarProduct";
import VideoProduct from "../../components/client/VideoProduct";
import ViewedProduct from "../../components/client/ViewedProduct";

const ProductDetail = () => {
  return (
    <div>
      <div className="custom-container py-4">
        <Bread title="Sản phẩm" />
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-9">
            <div className="grid grid-cols-12">
              <div className="col-span-5">
                <ProductImage />
              </div>
              <div className="col-span-7 ms-4">
                <ProductInfo />
              </div>
              <div className="col-span-12 my-5">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <ProductSpecification />
                  </div>
                  <div className="col-span-6">
                    <VideoProduct />
                  </div>
                </div>
              </div>
              <div className="col-span-12 my-5">
                <DescriptionProduct />
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <SimilarProduct />
          </div>
        </div>
        <div>
          <ViewedProduct />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
