import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Chip,
} from "@material-ui/core";
import Link from "next/link";

export default function ProductCard({ product }) {
  const hasDiscount = product.discountRate > 0;
  return (
    <Link href={`/shop/product?id=${product.id}`} passHref>
      <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardActionArea style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "stretch" }}>
          <Box
            minHeight={140}
            bgcolor="grey.200"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="body2" color="textSecondary">
              Product image
            </Typography>
          </Box>
          <CardContent style={{ flex: 1 }}>
            <Typography variant="subtitle1" noWrap gutterBottom>
              {product.title}
            </Typography>
            <Box display="flex" alignItems="center" flexWrap="wrap">
              <Typography variant="h6" color="primary">
                ${product.price.toFixed(2)}
              </Typography>
              {hasDiscount && (
                <Chip
                  size="small"
                  label={`-${product.discountRate}%`}
                  color="secondary"
                  style={{ marginLeft: 8 }}
                />
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
