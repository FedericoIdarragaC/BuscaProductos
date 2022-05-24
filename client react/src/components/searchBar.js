import { useState } from 'react';
import { BounceLoader } from 'react-spinners';
import axios from 'axios';
import { Product } from './product';

export const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [waiting, setWaiting] = useState(false);

  const getProducts = async () => {
    setWaiting(true);
    const response = await axios.get(`http://localhost:3000/api/products`, {
      params: { search },
    });
    setWaiting(false);
    setProducts(response.data.products);
  };

  console.log(products);
  console.log(search);

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <div>
        <h1 className="text-4xl text-white  font-semibold m-6">
          Welcome to our search system!
        </h1>
      </div>
      <div className="flex justify-between items-center bg-slate-400 py-2 w-4/6 shadow-gray-600 shadow-md rounded-lg">
        <i class="fa-solid fa-magnifying-glass ml-2"></i>
        <input
          type="text"
          className="rounded-md w-full p-1 mx-2"
          placeholder="Search for a product"
          onChange={({ target }) => {
            setSearch(target.value);
          }}
        ></input>
        <button
          className="p-1 mx-2 w-1/4 rounded-md bg-blue-500 font-semibold text-white"
          onClick={(e) => {
            e.preventDefault();
            getProducts();
          }}
        >
          Search
        </button>
      </div>
      <div>
        {waiting ? (
          <div className="mt-8">
            <BounceLoader />
          </div>
        ) : (
          products?.map((product) => {
            return <Product product={product} />;
          })
        )}
      </div>
    </div>
  );
};
