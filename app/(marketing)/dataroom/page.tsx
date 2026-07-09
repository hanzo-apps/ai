import DataroomClient from "./dataroom-client"
import { ProductFooter } from "@/components/products/ProductFooter"

export const metadata = {
  title: "Hanzo Dataroom - Secure Document Sharing & Analytics",
  description: "Share documents with real-time analytics, access controls, and custom branding. Perfect for fundraising, due diligence, and investor updates.",
}

export default function DataroomPage() {
  return (
    <>
      <DataroomClient />
      <ProductFooter slug="dataroom" name="Dataroom" />
    </>
  )
}
