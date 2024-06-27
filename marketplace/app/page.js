import ProductCard from "./components/ProductCard.jsx";
import RandomProduct from "./components/RandomProduct.jsx";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl text-center font-bold mb-4 text-black">Random Product</h1>
      <RandomProduct />
      <hr className="border-t-2 my-6 border-sky-500" />
      <h2 className="text-2xl font-semibold mb-4 text-black">Trending</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProductCard productId={35} />
        <ProductCard productId={36} />
        <ProductCard productId={37} />
      </div>
    </div>
  );
}
