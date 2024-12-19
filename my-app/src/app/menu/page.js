'use client';

import { Card, CardBody, CardFooter, Image, Button, Input, Modal } from "@nextui-org/react";
import Header from '../components/Header';
import { useCart } from '../providers/CartProvider';
import { toast } from 'react-hot-toast';
import { menuItems } from "../data/menuItems";
import { useState } from "react";
import { useSession } from 'next-auth/react';
import Footer from "../components/layout/Footer";

export default function MenuPage() {
  const { data: session } = useSession();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [type, setType] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (item) => {
    if (session) {
      addToCart(item);
      toast.success(`เพิ่ม ${item.name} ลงในตะกร้าแล้ว`);
    } else {
      toast.error('คุณต้อง login ก่อนเพิ่มสินค้าลงตะกร้า');
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const filteredMenuItems = menuItems.filter(item => {
    const lowerCaseName = item.name.toLowerCase();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const matchesSearch = lowerCaseName.includes(lowerCaseSearchTerm);
    
    if (type === 'all') {
      return matchesSearch;
    }
    return matchesSearch && item.type === type;
  });

  const sortedMenuItems = () => {
    switch (sortBy) {
      case 'name':
        return filteredMenuItems.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return filteredMenuItems.sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return filteredMenuItems.sort((a, b) => b.price - a.price);
      default:
        return filteredMenuItems;
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg mt-8 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">เมนูอาหาร</h1>

          <div className="flex items-center justify-between mb-4">
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="ค้นหาเมนู"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="ml-4 p-3 border rounded-lg dark:text-black"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">เรียงลำดับ</option>
              <option value="name">ชื่ออาหาร</option>
              <option value="price">ราคา น้อย-มาก</option>
              <option value="priceDesc">ราคา มาก-น้อย</option>
            </select>
          </div>
          <div className="flex items-center mb-4">
            ประเภท ของอาหาร{' '}
            <select
              className="ml-4 p-3 border rounded-lg dark:text-gray-900"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="all">ทั้งหมด</option>
              <option value="ของคาว">ของคาว</option>
              <option value="ของหวาน">ของหวาน</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedMenuItems().map((item) => (
              <Card key={item.id} className="max-w-sm hover:shadow-xl transition-shadow cursor-pointer" onClick={() => handleItemClick(item)}>
                <CardBody className="p-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-full h-72 object-cover"
                  />
                </CardBody>
                <CardFooter className="flex flex-col items-start">
                  <h2 className="text-xl font-semibold dark:text-white">{item.name}</h2>
                  <p className="text-gray-600 text-sm mt-1 dark:text-white line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center w-full mt-4">
                    <span className="text-lg font-bold dark:text-white">{item.price} บาท</span>
                    <Button 
                      color="primary" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                      className="hover:scale-105 transition-transform"
                    >
                      <span className='text-white'>เพิ่มลงตะกร้า</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        size="2xl"
        scrollBehavior="inside"
      >
        {selectedItem && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">{selectedItem.name}</h2>
                <p className="text-gray-700 mb-4">{selectedItem.description}</p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">ประเภท:</span>
                    <span className="text-gray-600">{selectedItem.type}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">ราคา:</span>
                    <span className="text-xl font-bold text-indigo-600">{selectedItem.price} บาท</span>
                  </div>
                  {selectedItem.ingredients && (
                    <div>
                      <span className="font-semibold block mb-2">ส่วนประกอบ:</span>
                      <ul className="list-disc list-inside text-gray-600">
                        {selectedItem.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Button 
                    color="primary"
                    size="lg"
                    className="w-full mt-6"
                    onClick={() => {
                      handleAddToCart(selectedItem);
                      closeModal();
                    }}
                  >
                    <span className="text-white">เพิ่มลงตะกร้า</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <Footer />
    </>
  );
}
