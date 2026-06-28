import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Menu, X, Star, Heart, ArrowRight } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";

// Image Imports
import heroImg from "@/assets/hero.png";
import catSkincareImg from "@/assets/category-skincare.png";
import catMakeupImg from "@/assets/category-makeup.png";
import catPerfumesImg from "@/assets/category-perfumes.png";
import catHaircareImg from "@/assets/category-haircare.png";
import featuredHeroImg from "@/assets/featured-hero.png";

const PRODUCTS = [
  { id: 1,  name: "Forever Young Cream",            price: 28.99, category: "Skincare" },
  { id: 2,  name: "Hyle Anti-Age Serum",            price: 34.99, category: "Skincare" },
  { id: 3,  name: "La Roche-Posay SPF",             price: 32.00, category: "Skincare" },
  { id: 4,  name: "Turmeric Vit C Cream",           price: 22.50, category: "Skincare" },
  { id: 5,  name: "Medicube TXA Serum",             price: 29.99, category: "Skincare" },
  { id: 6,  name: "Retinol Age-Defining",           price: 38.00, category: "Skincare" },
  { id: 7,  name: "Papaya Whitening Pkg",           price: 26.00, category: "Skincare" },
  { id: 8,  name: "Wokali Black Mask",              price: 18.99, category: "Skincare" },
  { id: 9,  name: "Angel Foundation",               price: 19.99, category: "Makeup" },
  { id: 10, name: "Omni Gold Highlighter",          price: 27.00, category: "Makeup" },
  { id: 11, name: "Egyptian Magic Cream",           price: 31.50, category: "Makeup" },
  { id: 12, name: "Radiant Hair Dye",               price: 16.99, category: "Hair Care" },
  { id: 13, name: "Baynee Maca Treatment",          price: 23.00, category: "Hair Care" },
  { id: 14, name: "Razac Body Lotion",              price: 14.99, category: "Body & Lotions" },
  { id: 15, name: "American Dream Cream",           price: 17.50, category: "Body & Lotions" },
  { id: 16, name: "Extreme Glow Argan",             price: 25.99, category: "Body & Lotions" },
];

const TESTIMONIALS = [
  { id: 1, name: "Sarah Jenkins", review: "The Forever Young Cream completely transformed my skin texture. It feels so luxurious and hydrating!", initials: "SJ" },
  { id: 2, name: "Emily Chen",    review: "I am obsessed with the Omni Gold Highlighter. It gives the most natural, buildable glow I've ever seen.", initials: "EC" },
  { id: 3, name: "Aisha Patel",  review: "Jane Beauty Store's shipping was incredibly fast, and the packaging was stunning. Felt like opening a gift.", initials: "AP" },
  { id: 4, name: "Marie Dubois", review: "La Roche-Posay SPF from here is my daily go-to. No white cast and sits perfectly under makeup.", initials: "MD" },
];

const getCategoryGradient = (category: string) => {
  switch (category) {
    case "Skincare":       return "bg-gradient-to-br from-pink-100 to-rose-100";
    case "Makeup":         return "bg-gradient-to-br from-rose-100 to-red-100";
    case "Hair Care":      return "bg-gradient-to-br from-green-50 to-emerald-100";
    case "Body & Lotions": return "bg-gradient-to-br from-orange-50 to-amber-100";
    default:               return "bg-gradient-to-br from-gray-50 to-slate-100";
  }
};

export default function Home() {
  const { addItem, totalItems, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleAddToCart = (product: typeof PRODUCTS[0]) => {
    addItem(product);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white">

      {/* NAVBAR */}
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div
            className="text-2xl md:text-3xl font-serif font-bold text-primary cursor-pointer tracking-tight"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-testid="logo"
          >
            Jane Beauty Store
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            {["Home", "Categories", "Shop", "About", "Contact"].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="hover:text-primary transition-colors"
                data-testid={`nav-${item.toLowerCase()}`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Cart button */}
            <button
              onClick={openCart}
              className="relative p-2 hover:bg-muted rounded-full transition-colors group"
              data-testid="cart-button"
            >
              <ShoppingCart className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                  data-testid="cart-badge"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 bg-white pt-24 px-6 md:hidden"
        >
          <nav className="flex flex-col gap-6 text-xl font-serif">
            {["Home", "Categories", "Shop", "About", "Contact"].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-left border-b border-muted pb-4 hover:text-primary transition-colors"
                data-testid={`mobile-nav-${item.toLowerCase()}`}
              >
                {item}
              </button>
            ))}
          </nav>
        </motion.div>
      )}

      {/* HERO BANNER */}
      <section id="home" className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt="Luxury Cosmetics" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm mb-6 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
              Premium Collection
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 drop-shadow-lg leading-tight">
              Unveil Your <br /> Natural Beauty
            </h1>
            <p className="text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 text-white/90 drop-shadow-md">
              Expertly curated skincare and beauty products for radiant, glowing skin. Step into a world of indulgence and softness.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto h-14 px-8 text-base font-medium rounded-full shadow-xl shadow-primary/20"
                onClick={() => scrollToSection("shop")}
                data-testid="hero-shop-now"
              >
                Shop Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md w-full sm:w-auto h-14 px-8 text-base font-medium rounded-full"
                onClick={() => scrollToSection("categories")}
                data-testid="hero-explore"
              >
                Explore Collections
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Shop by Category</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Skincare",  img: catSkincareImg },
              { name: "Makeup",    img: catMakeupImg },
              { name: "Perfumes",  img: catPerfumesImg },
              { name: "Hair Care", img: catHaircareImg },
            ].map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => scrollToSection("shop")}
                data-testid={`category-${cat.name.toLowerCase().replace(" ", "-")}`}
              >
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <h3 className="text-2xl font-serif text-white font-medium">{cat.name}</h3>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIAL OFFERS BANNER */}
      <section className="py-16 bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] relative overflow-hidden border-y border-border">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100/50 to-amber-50/50 mix-blend-multiply" />
        <div className="container relative z-10 mx-auto px-6 text-center">
          <Badge variant="outline" className="mb-4 border-primary text-primary bg-primary/5">Limited Time</Badge>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Buy 2, Get 1 <span className="text-primary italic">FREE</span> on all Skincare
          </h2>
          <p className="text-lg text-muted-foreground mb-8">Plus, enjoy Free Shipping on all orders over $50.</p>
          <Button size="lg" className="rounded-full shadow-lg" onClick={() => scrollToSection("shop")} data-testid="offer-claim">
            Claim Offer
          </Button>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section id="shop" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Featured Curations</h2>
              <div className="w-24 h-1 bg-primary rounded-full" />
            </div>
            <Button variant="ghost" className="hidden md:flex gap-2" onClick={openCart}>
              View Bag <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Hero side card */}
            <div className="lg:col-span-1">
              <div className="h-full min-h-[400px] rounded-3xl overflow-hidden relative">
                <img src={featuredHeroImg} alt="Featured" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-3xl font-serif text-white mb-2 leading-tight">The Glow<br />Edit</h3>
                  <p className="text-white/80 text-sm mb-4">Handpicked essentials for radiant skin.</p>
                  <Button variant="secondary" className="rounded-full bg-white text-black hover:bg-gray-100 border-none" onClick={() => scrollToSection("shop")}>
                    Discover More
                  </Button>
                </div>
              </div>
            </div>

            {/* Product grid */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {PRODUCTS.slice(0, 6).map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="bg-card rounded-2xl p-4 shadow-sm border border-border group hover:shadow-md transition-all"
                  data-testid={`product-card-${product.id}`}
                >
                  <div className={`relative h-56 rounded-xl mb-4 ${getCategoryGradient(product.category)} flex items-center justify-center p-6 text-center`}>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-4 right-4 w-8 h-8 bg-white/60 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
                      data-testid={`wishlist-${product.id}`}
                    >
                      <Heart className={`w-4 h-4 transition-colors ${wishlist.includes(product.id) ? "fill-primary text-primary" : "text-foreground"}`} />
                    </button>
                    <span className="font-serif text-xl text-foreground/30 italic leading-snug select-none">{product.name}</span>
                  </div>

                  <div className="px-1">
                    <div className="flex items-center gap-0.5 mb-2">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className="w-3 h-3 fill-accent text-accent" />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">(4.8)</span>
                    </div>
                    <h4 className="font-medium text-base leading-tight mb-0.5 truncate" data-testid={`product-name-${product.id}`}>{product.name}</h4>
                    <p className="text-muted-foreground text-xs mb-3">{product.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-xl" data-testid={`product-price-${product.id}`}>${product.price.toFixed(2)}</span>
                      <Button
                        size="sm"
                        className="rounded-full bg-foreground text-background hover:bg-primary transition-colors"
                        onClick={() => handleAddToCart(product)}
                        data-testid={`add-to-cart-${product.id}`}
                      >
                        Add to Bag
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* All products section below */}
          <div className="mt-16">
            <h3 className="text-2xl font-serif font-bold mb-8 text-center">More Products</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {PRODUCTS.slice(6).map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-2xl p-3 shadow-sm border border-border group hover:shadow-md transition-all"
                  data-testid={`product-card-${product.id}`}
                >
                  <div className={`relative h-32 rounded-xl mb-3 ${getCategoryGradient(product.category)} flex items-center justify-center p-4 text-center`}>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2 right-2 w-6 h-6 bg-white/60 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
                      data-testid={`wishlist-${product.id}`}
                    >
                      <Heart className={`w-3 h-3 ${wishlist.includes(product.id) ? "fill-primary text-primary" : "text-foreground"}`} />
                    </button>
                    <span className="font-serif text-xs text-foreground/30 italic leading-snug select-none">{product.name}</span>
                  </div>
                  <h4 className="font-medium text-sm leading-tight truncate mb-0.5" data-testid={`product-name-${product.id}`}>{product.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{product.category}</p>
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-serif font-bold text-sm" data-testid={`product-price-${product.id}`}>${product.price.toFixed(2)}</span>
                    <Button
                      size="sm"
                      className="rounded-full h-7 text-xs px-2 bg-foreground text-background hover:bg-primary transition-colors"
                      onClick={() => handleAddToCart(product)}
                      data-testid={`add-to-cart-${product.id}`}
                    >
                      Add
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Loved by Women Worldwide</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto">Discover why our customers trust us for their daily radiance and beauty rituals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-8 rounded-3xl shadow-sm border border-border flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-serif text-xl font-bold mb-6 shrink-0">
                  {t.initials}
                </div>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-6 flex-grow leading-relaxed">"{t.review}"</p>
                <h4 className="font-bold text-sm uppercase tracking-wider">— {t.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section id="about" className="py-24 bg-[#FAF7F5]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-foreground">The Jane Philosophy</h2>
          <p className="text-xl md:text-2xl font-serif italic text-muted-foreground leading-relaxed mb-10">
            "We handpick premium beauty products from trusted global brands to bring radiance and confidence to every woman. Our commitment is to quality, authenticity, and absolute customer satisfaction."
          </p>
          <img src={heroImg} alt="Brand" className="w-32 h-32 object-cover rounded-full mx-auto shadow-xl ring-4 ring-white" />
        </div>
      </section>

      {/* FOOTER & CONTACT */}
      <footer id="contact" className="bg-foreground text-white pt-24 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <h3 className="text-3xl font-serif font-bold mb-6">Jane Beauty Store</h3>
              <p className="text-white/60 mb-8 max-w-sm">
                Your Beauty, Our Passion. Curating the world's most luxurious cosmetics for your daily ritual.
              </p>
              <div className="flex gap-4">
                <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" data-testid="social-whatsapp">
                  <FaWhatsapp className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" data-testid="social-instagram">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" data-testid="social-facebook">
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors" data-testid="social-tiktok">
                  <FaTiktok className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-wider mb-6 text-sm text-white/80">Shop</h4>
              <ul className="space-y-4 text-white/60">
                {["Skincare", "Makeup", "Perfumes", "Hair Care"].map(cat => (
                  <li key={cat}><button onClick={() => scrollToSection("shop")} className="hover:text-white transition-colors">{cat}</button></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-wider mb-6 text-sm text-white/80">Company</h4>
              <ul className="space-y-4 text-white/60">
                <li><button onClick={() => scrollToSection("about")} className="hover:text-white transition-colors">About Us</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-wider mb-6 text-sm text-white/80">Contact</h4>
              <ul className="space-y-4 text-white/60">
                <li>jane@janebeautystore.com</li>
                <li>+1 (234) 567-8900</li>
                <li className="mt-6">
                  <Button className="w-full bg-white text-black hover:bg-primary hover:text-white rounded-full" data-testid="newsletter-button">
                    Join Our Newsletter
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-white/40 text-sm">
            <p>&copy; 2026 Jane Beauty Store. All Rights Reserved.</p>
            <p className="mt-4 md:mt-0">Designed with passion.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
