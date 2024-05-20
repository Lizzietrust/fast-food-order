import { products } from "../constants"
import Product from "./Product"


const Products = () => {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 md:gap-x-4 gap-y-10">
      {products.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </div>
  )
}

export default Products
