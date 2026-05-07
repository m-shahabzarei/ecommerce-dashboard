import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function ProductsActions() {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <Link href="/supplier/products/add">
        <Button variant="primary" size="md">
          افزودن محصول دستی
        </Button>
      </Link>
      {/* <Button variant="secondary" size="md">
        افزودن با اکسل
      </Button>
      <Button variant="secondary" size="md">
        افزودن باسلام
      </Button> */}
    </div>
  );
}
