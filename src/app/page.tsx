import Head from "next/head";
import Image from "next/image";
import Gallery from "../components/Gallery";

export default function Home() {
  return (
    <div>
    <Head>
      <title>Wedding Gallery</title>
      <meta name="description" content="View beautiful wedding and pre-wedding photos" />
    </Head>
    <Gallery />
  </div>
  );
}
