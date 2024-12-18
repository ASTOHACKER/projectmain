  import Hero from "./components/layout/hero";
import HomeMenu from "./components/layout/homemenu";
import SectionHeader from "./layout/SectionHeader";
import Header from "./components/Header";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg mt-8">
        <Hero />
        <div className="mt-12">
          <SectionHeader title="Our Features" subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, quod." />
        </div>
      </main>
      <Footer />
    </>
  );
}
/// 1:20:05 / 11:34:43
