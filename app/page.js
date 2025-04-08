import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={styles.page}>
        {/*Header Section*/}
        <header>
          <h1
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "3rem",
              color: "black",
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
          <p style={{ color: "black" }}>
            Discover elegant and handcrafted jewelry made with love!
          </p>
        </header>
        {/*Featured Products Section*/}
        <div
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          className={styles.image}
        >
          <div>
            <Image src="/image5.jpg" width={300} height={350} alt="ring" />
          </div>
          <div>
            <Image src="/image4.jpg" width={500} height={380} alt="ring" />
          </div>
          <div>
            <div style={{ display: "block" }}>
              <Image src="/image7.jpg" width={300} height={180} alt="ring" />
            </div>
            <div>
              <Image src="/image8.jpg" width={300} height={180} alt="ring" />
            </div>
          </div>
        </div>
  
        {/*Link To All Product*/}
        <div style={{ gap: "2rem" }} className={styles.footer}>
          <a href="/products">
            <button>View Products</button>
          </a>
          <a href="/about">
            <button>About</button>
          </a>
          <a href="/contact">
            <button>Contact</button>
          </a>
        </div>
        <a href="/products">
          <button className={styles.btn}>Shop Now</button>
        </a>
      </div>
    </>
  );
}
