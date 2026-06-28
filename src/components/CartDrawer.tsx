import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const getCategoryGradient = (category: string) => {
  switch (category) {
    case "Skincare": return "from-pink-100 to-rose-100";
    case "Makeup": return "from-rose-100 to-red-100";
    case "Hair Care": return "from-green-50 to-emerald-100";
    case "Body & Lotions": return "from-orange-50 to-amber-100";
    default: return "from-gray-50 to-slate-100";
  }
};

const getCategoryInitial = (category: string) => {
  return category.charAt(0).toUpperCase();
};

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, increment, decrement, clearCart, subtotal, totalItems } = useCart();
  const { toast } = useToast();

  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;
  const freeShippingRemaining = Math.max(0, 50 - subtotal);

  const handleCheckout = () => {
    toast({
      title: "Order Placed!",
      description: "Thank you for shopping at Jane Beauty Store. We'll be in touch soon.",
    });
    clearCart();
    closeCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={closeCart}
            data-testid="cart-backdrop"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 35 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-50 bg-white shadow-2xl flex flex-col"
            data-testid="cart-drawer"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-serif font-bold">Your Beauty Bag</h2>
                {totalItems > 0 && (
                  <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                data-testid="cart-close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free shipping progress */}
            {subtotal > 0 && (
              <div className="px-6 py-4 bg-muted/50 border-b border-border">
                {freeShippingRemaining > 0 ? (
                  <p className="text-sm text-muted-foreground mb-2">
                    Add <span className="font-semibold text-primary">${freeShippingRemaining.toFixed(2)}</span> more for free shipping
                  </p>
                ) : (
                  <p className="text-sm font-semibold text-green-600 mb-2">You have free shipping!</p>
                )}
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (subtotal / 50) * 100)}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center py-16"
                >
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-serif font-medium mb-2">Your bag is empty</h3>
                  <p className="text-muted-foreground text-sm mb-8">Add some luxurious products to get started</p>
                  <Button onClick={closeCart} className="rounded-full">
                    Continue Shopping
                  </Button>
                </motion.div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 60 }}
                      transition={{ duration: 0.22 }}
                      className="flex items-center gap-4 bg-card rounded-2xl p-4 border border-border shadow-sm"
                      data-testid={`cart-item-${item.id}`}
                    >
                      {/* Product thumb */}
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getCategoryGradient(item.category)} flex items-center justify-center shrink-0`}>
                        <span className="font-serif text-2xl text-foreground/30 font-bold">
                          {getCategoryInitial(item.category)}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm leading-snug truncate" data-testid={`cart-item-name-${item.id}`}>{item.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{item.category}</p>
                        <p className="font-serif font-bold text-primary" data-testid={`cart-item-price-${item.id}`}>${(item.price * item.quantity).toFixed(2)}</p>
                      </div>

                      {/* Qty controls */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          data-testid={`cart-remove-${item.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-2 bg-muted rounded-full px-1 py-1">
                          <button
                            onClick={() => decrement(item.id)}
                            className="w-6 h-6 rounded-full hover:bg-white flex items-center justify-center transition-colors"
                            data-testid={`cart-decrement-${item.id}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-semibold w-5 text-center" data-testid={`cart-qty-${item.id}`}>{item.quantity}</span>
                          <button
                            onClick={() => increment(item.id)}
                            className="w-6 h-6 rounded-full hover:bg-white flex items-center justify-center transition-colors"
                            data-testid={`cart-increment-${item.id}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Summary & Checkout */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-border bg-white space-y-4">
                {/* Order summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})</span>
                    <span data-testid="cart-subtotal">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-serif font-bold text-lg pt-2 border-t border-border">
                    <span>Total</span>
                    <span data-testid="cart-total">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout button */}
                <Button
                  size="lg"
                  className="w-full rounded-full h-14 text-base font-semibold shadow-lg shadow-primary/20 gap-2"
                  onClick={handleCheckout}
                  data-testid="cart-checkout"
                >
                  Checkout <ArrowRight className="w-5 h-5" />
                </Button>

                <button
                  onClick={closeCart}
                  className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-2 hover:underline"
                  data-testid="cart-continue-shopping"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
