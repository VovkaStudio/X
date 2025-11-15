import { ProductCard, type Product } from "@/components/ProductCard"
import { API_URL } from "@/constants"

export default async function ISR() {
  const responce = await fetch(API_URL, {
    next: {revalidate: 300}
  })
  const products = (await responce.json()) as Product[]

  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map(product => (
        <ProductCard 
        key={product.id}
        {...product}
      />
      ))}
    </div>
  )
}
