import { useEffect, useState } from "react"
import type { ProductType } from "./@types/ProductType"
import axios from "axios"
import ProductItem from "./components/ProductItem"
import type { CategoryType } from "./@types/CategoryType"
import { Loading } from "./assets/images"

const App = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [products, setProducts] = useState<ProductType[]>([])
  const [category, setCategory] = useState<CategoryType[]>([])
  const [categorySlug, setCategorySlug] = useState<string | null>(null)
  const [searchValue, setSearchValue] = useState<string>("") 


  useEffect(() => {
    axios.get("https://dummyjson.com/products").then(res => {
    setLoading(false)
    setProducts(res.data.products)
    })
  }, [])

  useEffect(() => {
    axios.get("https://dummyjson.com/products/categories").then(res => {
      setCategory(res.data);
      })
  }, [])

  useEffect(() => {
    if(categorySlug){
      axios.get(`https://dummyjson.com/products/category/${categorySlug}`).then(res => {
        setLoading(false)
        setProducts(res.data.products)
      })
    }
  }, [categorySlug])
  
  function handleClickSelect(e:React.ChangeEvent<HTMLSelectElement>) {
    setLoading(true)
    setCategorySlug(e.target.value)
  }

  //search input
  function handleSearchFn(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setSearchValue(value)

    if (value === "") {
      axios.get("https://dummyjson.com/products").then(res => {
        setProducts(res.data.products)
      })
    } else {
      axios.get("https://dummyjson.com/products").then(res => {
        const filtered = res.data.products.filter((item: ProductType) =>
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.price.toString().includes(value)
        )
        setProducts(filtered)
      })
    }
  }


  return (
    <div className="p-5">
      <div className="flex items-center gap-5 mb-5">
        <input autoComplete="off" onChange={handleSearchFn} value={searchValue} className="w-[300px] p-2 rounded-md border-[1px]  outline-none " type="text" placeholder="Qidirish" name="search" />
        <select onChange={handleClickSelect} className="w-[300px] p-2 rounded-md border-[1px]  outline-none ">
          <option value="all">All</option>
          {category.map((item, index) => <option key={index} value={item.slug} >{item.name}</option>)}
        </select>
      </div>
      <div className="flex justify-center items-center gap-5 flex-wrap">
        {loading ? <img className="mx-auto" src={Loading} alt="Loading" width={300} height={300} /> : products.map(item => <ProductItem key={item.id} item={item}/>)}
      </div>

    </div>

  )
}

export default App
