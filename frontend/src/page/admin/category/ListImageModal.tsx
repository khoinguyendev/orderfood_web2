import { IImage } from "../../../types/Image";

interface ListImageModal {
  setOpenModal: (o: boolean) => void;
  handleChange: any;
  images: IImage[];
}

const ListImageModal = ({ setOpenModal, handleChange, images }: ListImageModal) => {
  const handleSelectImage = (image: string) => {
    handleChange(image);
    setOpenModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center duration-400 justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[1200px] h-[700px] rounded-lg shadow-lg relative p-5">
        <button onClick={() => setOpenModal(false)} className="absolute h-10 w-10 rounded-full flex items-center justify-center bg-white -top-5 -right-5 text-gray1 text-xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="grid grid-cols-6 gap-3 overflow-y-auto max-h-[600px] py-2">
          {images.length > 0 &&
            images?.map((image, index) => (
              <div key={index} className="flex justify-center w-full">
                <img
                  onClick={() => handleSelectImage(image.url)}
                  src={image.url}
                  alt="..."
                  className="object-cover h-32 cursor-pointer rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ListImageModal;
