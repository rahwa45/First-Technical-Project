import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
<nav className="bg-white p-4 fixed top-0 w-full ">
  <div className="max-w-7xl mx-auto flex justify-between items-center font-bold">
    <Link href="/" className="text-white text-2xl font-bold">
      ambar
    </Link>
    <div className="flex space-x-6 gap-4">
      <Link href="/" className="text-black hover:font-semibold">
        Home
      </Link>

      <Link href="/products" className="text-black hover:font-normal">
        Products
      </Link>
    </div>
  </div>
</nav>;

export default function Home() {
  return (
    <div className={styles.page}>
      {/*Header Section*/}
      <nav className="bg-white p-4 fixed top-0 w-full ">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-bold">
          <Link href="/" className="text-white text-2xl font-bold">
            ambar
          </Link>
          <div className="flex space-x-6 gap-4">
            <Link href="/" className="text-black hover:font-semibold">
              Home
            </Link>

            <Link href="/products" className="text-black hover:font-normal">
              Products
            </Link>
          </div>
        </div>
      </nav>
      <header>
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "3rem",
          }}
        >
          AMBAR
          <Image
            src="/diamond1.webp"
            width={16}
            height={16}
            alt="diamond"
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
          JEWElRY
        </h1>
        <p className="text-center">
          Discover elegant, handcrafted jewelry made with love
        </p>
      </header>
      {/*Featured Products Section*/}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-xl shadow-sm">
        <div className="overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
          <Image
            src="/image5.jpg"
            width={300}
            height={300}
            alt="ring"
            className="object-cover"
          />
        </div>

        <div className="overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
          <Image
            src="/image4.jpg"
            width={480}
            height={320}
            alt="ring"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
            <Image
              src="/image7.jpg"
              width={250}
              height={300}
              alt="ring"
              className="object-cover"
            />
          </div>
          <div className="overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
            <Image
              src="/image8.jpg"
              width={250}
              height={300}
              alt="ring"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/*Link To All Product*/}
      <div style={{ gap: "1rem" }} className={styles.footer}>
        <a href="/products">
          <button className="font-bold">View All Products</button>
        </a>
        <a href="/about">
          <button className="font-bold">About</button>
        </a>
        <a href="/contact">
          <button className="font-bold">Contact</button>
        </a>
      </div>
      <a href="/products">
        <button className="bg-gradient-to-r from-amber-700 to-yellow-300 text-white font-semibold tracking-wide px-7 py-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none cursor-pointer">
          Shop Now
        </button>
      </a>
    </div>
  );
}
