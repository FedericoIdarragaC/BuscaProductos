export const Product = ({ product }) => {
  function numberWithPoints(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  return (
    <div className="flex items-center justify-center bg-white border border-gray-700 shadow-gray-600 shadow-md rounded-md m-8">
      <div className="w-1/2 p-4">
        <img src={product.imageUrl} width="242" height="242" />
      </div>
      <div className="flex flex-col items-start p-8 w-1/2 h-max relative bg-slate-300 rounded-md">
        <a href={product.url} target="_blank">
          <div>
            <h1 className=" text-lg text-slate-800 mb-4">{product.name}</h1>
          </div>
          <div>
            <h1 className=" font-bold text-2xl text-slate-700">
              {numberWithPoints(product.price)}
            </h1>
          </div>
        </a>
      </div>
    </div>
  );
};
