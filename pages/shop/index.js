import ShopLayout from "../../components/layouts/ShopLayout";

export default function Shop() {
  return <div>Shop Homepage Content</div>;
}

Shop.getLayout = function getLayout(page) {
  return <ShopLayout>{page}</ShopLayout>;
}
