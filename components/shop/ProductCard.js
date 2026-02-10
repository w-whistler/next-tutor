import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from "@material-ui/core";
import {
  AddShoppingCart,
  FavoriteBorder,
  Favorite,
  CompareArrows,
} from "@material-ui/icons";
import Link from "next/link";
import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function ProductCard({ product }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const { addToCart } = useContext(CartContext);
  const hasDiscount = product.discountRate > 0;
  const images = product.images && product.images.length > 0
    ? product.images
    : ["https://picsum.photos/seed/" + product.id + "/400/400"];
  const currentImage = images[imageIndex];
  const hasMultiple = images.length > 1;

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      sku: product.sku,
      quantity: 1,
    });
  }

  function handleLike(e) {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  }

  function handleCompare(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <Card
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Link href={"/shop/product?id=" + product.id} passHref>
        <a
          style={{
            display: "block",
            position: "relative",
            paddingTop: "100%",
            backgroundColor: "grey.200",
            overflow: "hidden",
          }}
          onMouseEnter={function () {
            if (hasMultiple && imageIndex === 0) setImageIndex(1);
          }}
          onMouseLeave={function () {
            setImageIndex(0);
          }}
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            style={{
              backgroundImage: "url(" + currentImage + ")",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {hasMultiple && (
            <Box
              position="absolute"
              bottom={6}
              left={0}
              right={0}
              display="flex"
              justifyContent="center"
            >
              {images.map(function (_, i) {
                return (
                  <Box
                    key={i}
                    onClick={function (e) {
                      e.preventDefault();
                      e.stopPropagation();
                      setImageIndex(i);
                    }}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: i === imageIndex ? "white" : "rgba(255,255,255,0.5)",
                      margin: "0 3px",
                      cursor: "pointer",
                    }}
                  />
                );
              })}
            </Box>
          )}
        </a>
      </Link>

      <CardContent style={{ padding: "8px 10px", flex: "0 0 auto" }}>
        <Link href={"/shop/product?id=" + product.id} passHref>
          <Typography
            variant="body2"
            noWrap
            component="a"
            style={{ color: "inherit", textDecoration: "none", display: "block" }}
          >
            {product.title}
          </Typography>
        </Link>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          mt={0.5}
          mb={1}
        >
          <Typography variant="subtitle2" color="primary" style={{ fontWeight: 600 }}>
            ${product.price.toFixed(2)}
          </Typography>
          {hasDiscount && (
            <Chip
              size="small"
              label={"-" + product.discountRate + "%"}
              color="secondary"
              style={{ marginLeft: 6, height: 20, fontSize: "0.7rem" }}
            />
          )}
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <IconButton
            size="small"
            color="primary"
            onClick={handleAddToCart}
            aria-label="Add to cart"
            style={{ padding: 6 }}
          >
            <AddShoppingCart fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color={liked ? "secondary" : "default"}
            onClick={handleLike}
            aria-label="Like"
            style={{ padding: 6 }}
          >
            {liked ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
          </IconButton>
          <IconButton
            size="small"
            onClick={handleCompare}
            aria-label="Compare"
            style={{ padding: 6 }}
          >
            <CompareArrows fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
