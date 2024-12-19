import Header from "../components/Header";

export default function About() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
          <h1 className="text-6xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 text-center">About us</h1>
          <div className="bg-white/30 p-8 rounded-lg backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700">
            <p className="mb-6 text-lg leading-relaxed">
              เราเป็นผู้ให้บริการที่มุ่งมั่นที่จะให้บริการที่ดีเยี่ยมและการแก้ปัญหาที่เป็นนวัตกรรม เรามีประสบการณ์มากกว่า 1 เดือนในการให้บริการลูกค้า
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-indigo-600 dark:text-indigo-400">วิสัยทัศน์ของเรา</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  มุ่งมั่นที่จะเป็นผู้นำในการให้บริการที่เป็นเลิศและสร้างประสบการณ์ที่น่าประทับใจให้กับลูกค้าทุกท่าน
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-400">พันธกิจของเรา</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  สร้างสรรค์นวัตกรรมและพัฒนาบริการอย่างต่อเนื่อง เพื่อตอบสนองความต้องการของลูกค้าอย่างมีประสิทธิภาพ
                </p>
              </div>
            </div>
            <p className="mb-4 text-lg">
              ทีมงานของเราประกอบด้วยผู้เชี่ยวชาญที่มีความหลงใหลในการทำงานและมุ่งมั่นที่จะส่งมอบผลลัพธ์ที่ดีที่สุดสำหรับลูกค้าของเรา
            </p>
            <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-green-600 dark:text-green-400">ติดต่อเรา</h3>
              <p className="text-gray-700 dark:text-gray-300">
                หากคุณมีคำถามหรือต้องการข้อมูลเพิ่มเติม สามารถติดต่อเราได้ที่:
                <br />
                อีเมล: contact@example.com
                <br />
                โทร: 02-XXX-XXXX
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-white/80 to-transparent dark:from-gray-800/80" />
      </main>
    </>
  );
}
