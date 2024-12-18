'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Button,
  Divider,
  Spacer,
} from "@nextui-org/react";
import Header from '../components/Header';
import { FaUser, FaEnvelope, FaCalendar, FaShoppingBag } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        toast.error('ไม่สามารถดึงข้อมูลคำสั่งซื้อได้');
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchOrders();
    }
  }, [session]);

  if (status === 'loading' || loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen p-8 dark:text-white">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen p-4 md:p-8 dark:text-white">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-md">
            <CardHeader className="flex flex-col md:flex-row gap-5 p-6 bg-gradient-to-r from-blue-500 to-blue-600">
              <Avatar
                src={session?.user?.image || 'https://ui-avatars.com/api/?name=' + session?.user?.name}
                className="w-24 h-24 text-large border-4 border-white"
              />
              <div className="flex flex-col gap-1 text-white">
                <h1 className="text-2xl font-bold">{session?.user?.name || 'ผู้ใช้งาน'}</h1>
                <p className="text-white/90">{session?.user?.email}</p>
              </div>
            </CardHeader>

            <CardBody className="p-6">
              {/* User Info Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2 dark:text-white">
                    <FaUser className="text-blue-500" />
                    ข้อมูลส่วนตัว
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-gray-400" />
                      <span className="font-medium dark:text-white">ชื่อ:</span>
                      <span className="dark:text-white">{session?.user?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-gray-400" />
                      <span className="font-medium dark:text-white">อีเมล:</span>
                      <span className="dark:text-white">{session?.user?.email}</span>
                    </div>
                  </div>
                </div>

                {/* Orders Section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2 dark:text-white">
                    <FaShoppingBag className="text-blue-500" />
                    ประวัติการสั่งซื้อล่าสุด
                  </h2>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-4">
                    {orders.length === 0 ? (
                      <p className="text-gray-500 dark:text-gray-300 text-center">ยังไม่มีประวัติการสั่งซื้อ</p>
                    ) : (
                      <div className="space-y-4">
                        {orders.slice(0, 3).map((order) => (
                          <div
                            key={order._id}
                            className="border-b last:border-b-0 pb-4 last:pb-0"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium dark:text-white">คำสั่งซื้อ: {order._id}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  วันที่: {new Date(order.createdAt).toLocaleDateString('th-TH')}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  ยอดรวม: ฿{order.totalAmount.toLocaleString()}
                                </p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-sm ${
                                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status === 'completed' ? 'เสร็จสมบูรณ์' :
                                 order.status === 'processing' ? 'กำลังดำเนินการ' :
                                 order.status === 'cancelled' ? 'ยกเลิก' : 'รอดำเนินการ'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Divider className="my-6" />

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                <Button 
                  color="secondary"
                  className="flex items-center gap-2"
                  onClick={() => router.push('/profile/edit')}
                >
                  <FaUser />
                  แก้ไขข้อมูลส่วนตัว
                </Button>
                <Button 
                  color="secondary"
                  variant="bordered"
                  className="flex items-center gap-2"
                  onClick={() => router.push('/orders')}
                >
                  <FaShoppingBag />
                  ดูประวัติการสั่งซื้อทั้งหมด
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </main>
    </>
  );
}
