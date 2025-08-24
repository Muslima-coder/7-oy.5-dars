import type { FC } from "react"
import type { ProductType } from "../@types/ProductType"

const ProductItem:FC<{item:ProductType}> = ({item}) => {
  return (
    <div className="w-[350px] h-[500px] text-white bg-slate-900 shadow-lg shadow-slate-200 p-2 rounded-lg overflow-hidden ">
            <img className="mb-2" src={item.images[0]} alt="Product img" width="350" height="200" />
            <div className="px-2 pb-2">
                <h2 className="font-bold mb-[5px] text-[22px] ">{item.title}</h2>
                <p className="font-medium line-clamp-2 mb-[5px]">{item.description}</p>
                <div className="flex items-center justify-between">
                    <strong className="text-red-300">{item.category}</strong>
                    <strong>{item.price}</strong>
                </div>
            </div>
        </div>
  )
}

export default ProductItem
