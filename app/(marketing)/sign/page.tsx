import SignClient from "./sign-client"
import { ProductFooter } from "@/components/products/ProductFooter"

export const metadata = {
  title: "Hanzo Sign — send a document, get it signed",
  description: "Upload a PDF, place the fields, send it. Each signer signs in a browser and the finished document comes back with a record of who signed, when, and from where. Open source, self-hostable.",
}

export default function SignPage() {
  return (
    <>
      <SignClient />
      <ProductFooter slug="sign" name="Sign" />
    </>
  )
}
