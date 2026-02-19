import { useRouter } from "next/router";
import { Container, Typography } from "@material-ui/core";
import Head from "next/head";
import ProductSection from "../../components/shop/ProductSection";
import { getCategories, getProductsByCategoryId } from "../../lib/shopApi";

function findCategoryPath(id, nodes, path) {
  if (!id || !nodes) return null;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const nextPath = path.concat([node.label]);
    if (node.id === id) return nextPath;
    if (node.children && node.children.length > 0) {
      const found = findCategoryPath(id, node.children, nextPath);
      if (found) return found;
    }
  }
  return null;
}

function getLevel1Id(id, categories) {
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].id === id) return id;
    const level2 = categories[i].children || [];
    for (let j = 0; j < level2.length; j++) {
      if (level2[j].id === id) return categories[i].id;
      const level3 = level2[j].children || [];
      for (let k = 0; k < level3.length; k++) {
        if (level3[k].id === id) return categories[i].id;
      }
    }
  }
  return id;
}

export default function CategoryPage({ products = [], categoryLabel = "" }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>{categoryLabel || "Category"} | eCommerce</title>
        <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
      </Head>
      <Container maxWidth="lg" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <Typography variant="h5" gutterBottom>
          {categoryLabel || "Category"}
        </Typography>
        {products.length === 0 ? (
          <Typography color="textSecondary">
            No products in this category.
          </Typography>
        ) : (
          <ProductSection title="Products" products={products} />
        )}
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;
  if (!id || typeof id !== "string") {
    return { props: { products: [], categoryLabel: "" } };
  }
  try {
    const categories = await getCategories();
    const level1Id = getLevel1Id(id, categories);
    const products = await getProductsByCategoryId(level1Id);
    const path = findCategoryPath(id, categories, []);
    const categoryLabel = path ? path.join(" › ") : id;
    return {
      props: {
        products,
        categoryLabel,
      },
    };
  } catch (e) {
    return { props: { products: [], categoryLabel: id || "" } };
  }
}
