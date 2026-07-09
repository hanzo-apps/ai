import SignClient from "./sign-client"
import { ProductFooter } from "@/components/products/ProductFooter"

export const metadata = {
  title: "Hanzo Sign - Document Signing Platform",
  description: "Secure, legally binding electronic signatures. Create, send, and manage document signing with templates, workflows, and Hanzo IAM SSO.",
}

export default function SignPage() {
  return (
    <>
      <SignClient />
      <ProductFooter slug="sign" name="Sign" />
    </>
  )
}
