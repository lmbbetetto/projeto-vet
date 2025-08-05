import { ShoppingCart } from "../shopping-cart";
import { items } from "../shopping-cart/mock";

export function HeaderEcommerce() {
  return (
    <div className="h-10 p-30 pt-12 pb-12 flex items-center justify-between border-b z-50 relative bg-white">
      <div>logo</div>
      <div className="flex gap-4">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
      </div>
      <ShoppingCart itemCount={items.length} items={items} />
    </div>
  );
}
