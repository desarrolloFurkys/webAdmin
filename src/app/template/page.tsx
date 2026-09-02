import Link from "next/link";

const SECTIONS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Home / Shop demos",
    links: [
      { href: "/template/fashion-1", label: "Fashion 1" },
      { href: "/template/fashion-2", label: "Fashion 2" },
      { href: "/template/fashion-3", label: "Fashion 3" },
      { href: "/template/furniture-shop", label: "Furniture shop" },
      { href: "/template/gadget-shop", label: "Gadget shop" },
      { href: "/template/gift-shop", label: "Gift shop" },
      { href: "/template/grocery-1", label: "Grocery 1" },
      { href: "/template/grocery-2", label: "Grocery 2" },
      { href: "/template/grocery-3", label: "Grocery 3" },
      { href: "/template/health-beauty", label: "Health & beauty" },
      { href: "/template/market-1", label: "Market 1" },
      { href: "/template/market-2", label: "Market 2" },
      { href: "/template/sale-page-1", label: "Sale page 1" },
      { href: "/template/sale-page-2", label: "Sale page 2" }
    ]
  },
  {
    title: "Shops & search",
    links: [
      { href: "/template/shops", label: "Shop list" },
      { href: "/template/mobile-category-nav", label: "Mobile category nav" }
    ]
  },
  {
    title: "Auth",
    links: [
      { href: "/template/login", label: "Login" },
      { href: "/template/signup", label: "Signup" }
    ]
  },
  {
    title: "Cart & checkout",
    links: [
      { href: "/template/cart", label: "Cart" },
      { href: "/template/payment", label: "Payment" },
      { href: "/template/checkout-alternative", label: "Checkout (alternative)" }
    ]
  },
  {
    title: "Customer dashboard",
    links: [
      { href: "/template/profile", label: "Profile" },
      { href: "/template/orders", label: "Orders" },
      { href: "/template/address", label: "Addresses" },
      { href: "/template/payment-methods", label: "Payment methods" },
      { href: "/template/support-tickets", label: "Support tickets" },
      { href: "/template/wish-list", label: "Wish list" }
    ]
  },
  {
    title: "Vendor dashboard",
    links: [
      { href: "/template/vendor/dashboard", label: "Dashboard" },
      { href: "/template/vendor/products", label: "Products" },
      { href: "/template/vendor/orders", label: "Orders" },
      { href: "/template/vendor/account-settings", label: "Account settings" }
    ]
  }
];

export default function TemplateLibraryPage() {
  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 80px" }}>
      <h1>Librería de componentes Bonik</h1>
      <p>
        Estas son las páginas de demostración del template Bonik, conservadas como referencia. No forman parte del
        sitio real de Furky&apos;s.
      </p>
      {SECTIONS.map((section) => (
        <section key={section.title} style={{ marginTop: 32 }}>
          <h2>{section.title}</h2>
          <ul>
            {section.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
