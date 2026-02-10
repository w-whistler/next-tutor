import { useRouter } from "next/router";
import { Container, Typography } from "@material-ui/core";
import { useMemo } from "react";
import Head from "next/head";
import ProductSection from "../../components/shop/ProductSection";
import { allProducts, categories } from "../../data/shopData";

function findCategoryPath(id, nodes, path) {
  if (!id || !nodes) return null;
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    var nextPath = path.concat([node.label]);
    if (node.id === id) return nextPath;
    if (node.children && node.children.length > 0) {
      var found = findCategoryPath(id, node.children, nextPath);
      if (found) return found;
    }
  }
  return null;
}

function getLevel1Id(id) {
  for (var i = 0; i < categories.length; i++) {
    if (categories[i].id === id) return id;
    var level2 = categories[i].children || [];
    for (var j = 0; j < level2.length; j++) {
      if (level2[j].id === id) return categories[i].id;
      var level3 = level2[j].children || [];
      for (var k = 0; k < level3.length; k++) {
        if (level3[k].id === id) return categories[i].id;
      }
    }
  }
  return id;
}

export default function CategoryPage() {
  const router = useRouter();
  const { id } = router.query;
  const products = useMemo(
    function () {
      if (!id || typeof id !== "string") return [];
      var level1Id = getLevel1Id(id);
      return allProducts.filter(function (p) {
        return p.categoryId === level1Id;
      });
    },
    [id]
  );

  const categoryLabel = useMemo(
    function () {
      if (!id) return "";
      var path = findCategoryPath(id, categories, []);
      return path ? path.join(" › ") : id;
    },
    [id]
  );

  return (
    <>
      <Head>
        <title>{categoryLabel || "Category"} | eCommerce</title>
        <link rel="icon" href="/static/favicon.ico" />
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
