"use client";

import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SearchResultsComponent = () => {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const search = async () => {
      const result = await axios.get(`/api/search?search=${searchTerm}`);
      setSearchResults(result.data.result);
    };

    if (searchTerm) {
      search();
    }
  }, [searchTerm]);

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?search=${searchTerm}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="block md:hidden mb-4">
        <form className="flex flex-row" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="flex-grow bg-slate-100 rounded-lg p-2"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="ml-2 p-2 bg-sky-500 text-white rounded-lg">Search</button>
        </form>
      </div>
      <h1 className="text-2xl font-bold text-center mb-6">Search Results</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.map((product) => (
          <Link href={`/productDetails?productId=${product.productId}`} key={product.productId}>
            <div className="flex flex-row p-4 border border-gray-300 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex-shrink-0">
                <Image src={`/api/uploads/product-${product.productId}.png`} alt="Product" width={100} height={100} className="rounded-lg" />
              </div>
              <div className="flex flex-col justify-center ml-4">
                <h1 className="text-2xl font-semibold text-gray-800 mb-1">{product.name}</h1>
                <p className="text-xl text-gray-600">{product.price}€</p>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

const SearchResults = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SearchResultsComponent />
  </Suspense>
);

export default SearchResults;
