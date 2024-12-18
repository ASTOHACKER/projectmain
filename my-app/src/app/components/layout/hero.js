'use client';
import Right from "../icons/right";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import toast from "react-hot-toast";

export default function Hero() {
  const images = [
    {
      url: "https://images.squarespace-cdn.com/content/v1/59bf8dc3e5dd5b141a2ba135/1537374079075-GFBZGH19UCT25QK9M4XY/%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%97%E0%B8%B3%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%81%E0%B8%A5%E0%B9%88%E0%B8%AD%E0%B8%87.jpg",
      title: "อาหารสดใหม่"
    },
    {
      url: "https://img.freepik.com/free-photo/view-delicious-food-from-around-world_23-2151596569.jpg?t=st=1734473313~exp=1734476913~hmac=b1aac377154c2cc7eca66cfcc5158434bbd3acd6e5f736805e46c9756f48055f&w=1380",
      title: "อร่อยทุกเมนู"
    },
    {
      url: "https://www.xn--o3cdbr1ab9cle2ccb9c8gta3ivab.com/wp-content/uploads/2019/09/Food-Delivery.jpg",
      title: "จัดส่งรวดเร็ว"
    }
  ];

  const copyPromoCode = () => {
    navigator.clipboard.writeText('NEWFOOD50')
      .then(() => {
        toast.success('คัดลอกโค้ดส่วนลดแล้ว');
      })
      .catch((err) => {
        console.error('Failed to copy code:', err);
      });
  };

  return (
    <section className="hero mt-1">
      <div className="py-4 md:py-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          สั่งอาหารออนไลน์<br />
          <span className="text-primary">ง่าย สะดวก รวดเร็ว</span><br />
          ที่ &nbsp;
          <span className="text-primary font-extrabold">FoodNext</span>
        </h1>
        <p className="my-6 text-gray-600 text-base max-w-md mx-auto">
          เลือกสั่งอาหารจากร้านดังมากมาย พร้อมบริการจัดส่งถึงบ้าน
          ด้วยระบบที่ใช้งานง่าย และปลอดภัย
        </p>
        
        {/* Promotion Code Section */}
        <div className="max-w-md mx-auto mb-8 bg-primary/5 p-4 rounded-xl border border-primary/20">
          <p className="text-primary font-semibold mb-2">โค้ดส่วนลดสำหรับลูกค้าใหม่</p>
          <div className="flex items-center gap-3 justify-center">
            <div className="bg-white px-6 py-2 rounded-lg border-2 border-dashed border-primary font-mono font-bold text-lg dark:text-black">
              NEWFOOD50
            </div>
            <button 
              onClick={copyPromoCode}
              className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-all text-sm">
              คัดลอก
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">รับส่วนลด 50 บาท เมื่อสั่งอาหารครั้งแรก</p>
        </div>

        <div className="flex justify-center gap-4 text-sm mb-8">
          <button className="flex justify-center bg-primary hover:bg-primary/90 transition-all uppercase items-center gap-2 text-white px-6 py-3 rounded-full font-semibold">
            สั่งตอนนี้
            <Right />
          </button>
          <button className="flex items-center border-2 border-gray-300 hover:border-primary hover:text-primary transition-all gap-2 px-6 py-3 rounded-full text-gray-600 font-semibold dark:text-white">
            เรียนรู้เพิ่มเติม
            <Right />
          </button>
        </div>
      </div>
      
      {/* Swiper section */}


      {/* Content section */}
      

      <div className="w-full max-w-[600px] mx-auto px-4 mb-12">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="w-full h-[420px] md:h-[490px] rounded-2xl"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img 
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 flex flex-col items-center justify-center rounded-2xl">
                  <h2 className="text-white text-2xl md:text-4xl font-bold drop-shadow-lg text-center px-4">{image.title}</h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="relative w-full max-w-[900px] mx-auto px-4 mt-8 ">
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 max-w-[400px] mx-auto dark:bg-gray-800">
          <h2 className="text-xl font-bold mb-4 dark:text-white">ทำไมต้องเลือกใช้ FoodNext?</h2>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-white">
              FoodNext คือแพลตฟอร์มสั่งอาหารออนไลน์ที่เข้าใจความต้องการของคุณ เรามุ่งมั่นที่จะมอบประสบการณ์การสั่งอาหารที่เหนือระดับ
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 group">
                <span className="bg-primary/10 p-1.5 rounded-full group-hover:bg-primary/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </span>
                <span className="text-gray-700 dark:text-white">อาหารคุณภาพ</span>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="bg-primary/10 p-1.5 rounded-full group-hover:bg-primary/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </span>
                <span className="text-gray-700 dark:text-white">จัดส่งรวดเร็ว ตรงเวลา</span>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="bg-primary/10 p-1.5 rounded-full group-hover:bg-primary/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </span>
                <span className="text-gray-700 dark:text-white">ระบบชำระเงินปลอดภัย</span>
              </li>
              <li className="flex items-center gap-3 group">
                <span className="bg-primary/10 p-1.5 rounded-full group-hover:bg-primary/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </span>
                <span className="text-gray-700 dark:text-white">โปรโมชั่นพิเศษทุกวัน</span>
              </li>
            </ul>
            <button className="w-full mt-4 bg-primary hover:bg-primary/90 transition-all text-white py-2 rounded-xl font-semibold">
              เริ่มใช้งานเลย
            </button>
          </div>
        </div>
      </div>

      {/* Payment Support Section */}
      <div className="bg-gray-50 py-8 mt-12 dark:bg-gray-800">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">ระบบชำระเงินที่ปลอดภัย</h2>
            <p className="text-gray-800 mt-2 dark:text-white">รองรับการชำระเงินหลากหลายช่องทาง</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Stripe Card */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all dark:bg-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#6772E5] p-2 rounded-lg">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg dark:text-black">Stripe</h3>
                    <p className="text-sm text-gray-600">บัตรเครดิต/เดบิต</p>
                  </div>
                </div>
                <span className="text-green-500 bg-green-50 px-3 py-1 rounded-full text-sm">พร้อมใช้งาน</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  รองรับบัตรทุกธนาคาร
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  ระบบความปลอดภัยระดับสากล
                </li>
              </ul>
            </div>

            {/* PromptPay Card */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#1F4EF5] p-2 rounded-lg">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg dark:text-black">PromptPay</h3>
                    <p className="text-sm text-gray-600">พร้อมเพย์</p>
                  </div>
                </div>
                <span className="text-green-500 bg-green-50 px-3 py-1 rounded-full text-sm">พร้อมใช้งาน</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  โอนเงินได้ทันที
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  ไม่มีค่าธรรมเนียม
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">ระบบชำระเงินได้รับการรับรองความปลอดภัยตามมาตรฐานสากล</p>
            <div className="flex justify-center gap-4 mt-4">
              <img src="https://static.isms.online/app/uploads/2020/12/pci-dss-1.png" alt="PCI DSS" className="h-8 opacity-50" />
              <img src="https://media.licdn.com/dms/image/v2/D5612AQEUVYLm3K9Zug/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1727500829605?e=2147483647&v=beta&t=OTfJiV2sSrraggOfCJuJ3LtUuUoAGJspmOgFpY-_ZI4" alt="SSL Secure" className="h-8 opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
