import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-footer py-6">
      <div className="custom-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <h3 className="text-lg font-bold text-white">Về chúng tôi</h3>
            <ul className="mt-4">
              <li>
                <Link to="#" className="text-tfooter text-sm">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="#" className="text-tfooter text-sm">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="#" className="text-tfooter text-sm">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="#" className="text-tfooter text-sm">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="#" className="text-tfooter text-sm">
                  Giới thiệu
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Về chúng tôi</h3>
            <ul className="mt-4">
              <li>
                <Link to="#" className="text-tfooter text-sm">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="#" className="text-tfooter text-sm">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="#" className="text-tfooter text-sm">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="#" className="text-tfooter text-sm">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="#" className="text-tfooter text-sm">
                  Giới thiệu
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Về chúng tôi</h3>
            <ul className="mt-4">
              <li>
                <Link to="#" className="text-tfooter text-sm">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="#" className="text-tfooter text-sm">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="#" className="text-tfooter text-sm">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="#" className="text-tfooter text-sm">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="#" className="text-tfooter text-sm">
                  Giới thiệu
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Về chúng tôi</h3>
            <ul className="mt-4">
              <li>
                <Link to="#" className="text-tfooter text-sm">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="#" className="text-tfooter text-sm">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="#" className="text-tfooter text-sm">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="#" className="text-tfooter text-sm">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="#" className="text-tfooter text-sm">
                  Giới thiệu
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="boder border-tfooter my-5" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-lg text-white mb-3 font-bold">Thiên đường</h4>

            <ul className="text-sm text-tfooter">
              <li>Xienis</li>
              <li>Địa chỉ: ***</li>
              <li>
                Điện thoại:{" "}
                <a className="fone" href="tel:19006750">
                  19006750
                </a>
                - Email: <a href="mailto:support@sapo.vn">nguyen12012k1@gmail.com</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg text-white mb-3 font-bold">Nhận tin khuyến mãi</h4>
            <div className="flex items-center border border-gray-300 overflow-hidden">
              <input type="text" className="flex-1 px-4 py-2 outline-none" placeholder="Nhập email của bạn..." />
              <button className="bg-primary text-white px-5 py-2">Gửi</button>
            </div>
          </div>
        </div>
        <hr className="boder border-tfooter my-5" />
        <div className="flex justify-center items-center text-white">Bản quyền thuộc về Khôi Nguyên</div>
      </div>
    </div>
  );
};

export default Footer;
