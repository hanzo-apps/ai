'use client'


import React from "react";
import { 
  ShoppingCart, CreditCard, Package, BarChart, 
  Tags, Gift, Truck, Globe, Shield, Database
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 hover:border-border transition-colors duration-300">
      <div className="bg-primary/5 p-3 rounded-lg w-fit mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <ShoppingCart className="h-6 w-6 text-foreground/60" />,
      title: "Carts",
      description: "A cart is a real object with its own id, so someone can leave and come back, and you can look at what they left in it."
    },
    {
      icon: <Package className="h-6 w-6 text-foreground/60" />,
      title: "Products and variants",
      description: "A product holds the description; a variant holds the size, the colour and the price. Stock is tracked on the variant, which is the thing people actually buy."
    },
    {
      icon: <CreditCard className="h-6 w-6 text-foreground/60" />,
      title: "Authorize and capture",
      description: "Two steps, not one. Hold the money when the order is placed and take it when the box ships, which is what your accountant and your customer both expect."
    },
    {
      icon: <Gift className="h-6 w-6 text-foreground/60" />,
      title: "Coupons and discounts",
      description: "Applied to a cart or to an invoice, and recorded as their own line. The reason a total came out lower survives the transaction."
    },
    {
      icon: <Tags className="h-6 w-6 text-foreground/60" />,
      title: "Prices per store",
      description: "One catalogue can answer differently for different stores. The product does not have to be duplicated to be priced twice."
    },
    {
      icon: <BarChart className="h-6 w-6 text-foreground/60" />,
      title: "Subscriptions",
      description: "Plans, prices and renewals sit in the same service as the orders, so a customer who buys once and subscribes once is one customer with one history."
    },
    {
      icon: <Truck className="h-6 w-6 text-foreground/60" />,
      title: "Orders, refunds and returns",
      description: "The whole life of an order, including the parts nobody demos. A return is a first-class object rather than a note in a support ticket."
    },
    {
      icon: <Globe className="h-6 w-6 text-foreground/60" />,
      title: "Many stores, one install",
      description: "Stores are scoped by organisation, so an agency or a marketplace runs several without running several copies of this."
    },
    {
      icon: <Shield className="h-6 w-6 text-foreground/60" />,
      title: "It never sees a card",
      description: "Card numbers are tokenized in a separate service and this one only ever holds the token. That is a smaller thing to secure, and a much smaller thing to be audited on."
    },
    {
      icon: <Database className="h-6 w-6 text-foreground/60" />,
      title: "Your data, per tenant",
      description: "Each organisation's records live in its own store. Isolation is a file boundary rather than a WHERE clause somebody has to remember to write."
    }
  ];

  return (
    <section className="py-16 bg-[var(--black)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">What it keeps track of</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            The nouns a shop is made of, each one addressable and none of them assuming what your site looks like.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
