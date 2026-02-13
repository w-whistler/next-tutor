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
  ChevronLeft,
  ChevronRight,
  FavoriteBorder,
  Favorite,
  CompareArrows,
} from "@material-ui/icons";
import Link from "next/link";
import { useState, useContext, useRef, useEffect, memo } from "react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

function ProductCard({ product }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [showThumbArrows, setShowThumbArrows] = useState(false);
  const thumbScrollRef = useRef(null);
  const roRef = useRef(null);
  const { addToCart } = useContext(CartContext);
  const { isLiked, toggleLike } = useContext(WishlistContext);
  const liked = isLiked(product.id);
  const hasDiscount = product.discountRate > 0;
  const images = product.images && product.images.length > 0
    ? product.images
    : ["https://picsum.photos/seed/" + product.id + "/400/400"];
  const currentImage = images[imageIndex];
  const hasMultiple = images.length > 1;

  useEffect(
    function () {
      if (!hasMultiple) return;
      const id = requestAnimationFrame(function () {
        const el = thumbScrollRef.current;
        if (!el) return;
        function check() {
          setShowThumbArrows(el.scrollWidth > el.clientWidth);
        }
        check();
        const ro = new ResizeObserver(check);
        roRef.current = ro;
        ro.observe(el);
      });
      return function () {
        cancelAnimationFrame(id);
        if (roRef.current) {
          roRef.current.disconnect();
          roRef.current = null;
        }
      };
    },
    [hasMultiple, images.length]
  );

  useEffect(
    function () {
      if (!hasMultiple) return;
      const id = requestAnimationFrame(function () {
        const el = thumbScrollRef.current;
        if (!el) return;
        const thumbWidth = 36;
        const thumbMargin = 4;
        const totalWidth = thumbWidth + thumbMargin;
        const centerOfThumb = imageIndex * totalWidth + thumbWidth / 2;
        const scrollLeft = centerOfThumb - el.clientWidth / 2;
        el.scrollLeft = Math.max(0, Math.min(scrollLeft, el.scrollWidth - el.clientWidth));
      });
      return function () {
        cancelAnimationFrame(id);
      };
    },
    [imageIndex, hasMultiple, images.length]
  );

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
    toggleLike(product.id);
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
              bottom={0}
              left={0}
              right={0}
              display="flex"
              alignItems="center"
              py={0.5}
              style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                maxHeight: 44,
                overflow: "hidden",
              }}
            >
              {showThumbArrows && (
                <IconButton
                  size="small"
                  onClick={function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (thumbScrollRef.current) {
                      thumbScrollRef.current.scrollBy({ left: -44, behavior: "smooth" });
                    }
                  }}
                  style={{ color: "white", padding: 4 }}
                >
                  <ChevronLeft fontSize="small" />
                </IconButton>
              )}
              <Box
                ref={thumbScrollRef}
                style={{
                  flex: 1,
                  minWidth: 0,
                  overflowX: "auto",
                  overflowY: "hidden",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                  textAlign: "center",
                }}
                className="product-card-thumb-scroll"
              >
                <Box display="inline-flex" flexWrap="nowrap" style={{ padding: "0 2px" }}>
                  {images.map(function (img, i) {
                    const isSelected = i === imageIndex;
                    return (
                      <Box
                        key={i}
                        onClick={function (e) {
                          e.preventDefault();
                          e.stopPropagation();
                          setImageIndex(i);
                        }}
                        style={{
                          width: 36,
                          height: 36,
                          flexShrink: 0,
                          borderRadius: 4,
                          overflow: "hidden",
                          cursor: "pointer",
                          border: isSelected ? "2px solid white" : "1px solid rgba(255,255,255,0.5)",
                          boxSizing: "border-box",
                          margin: "0 2px",
                        }}
                      >
                        <Box
                          width="100%"
                          height="100%"
                          style={{
                            backgroundImage: "url(" + img + ")",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              {showThumbArrows && (
                <IconButton
                  size="small"
                  onClick={function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (thumbScrollRef.current) {
                      thumbScrollRef.current.scrollBy({ left: 44, behavior: "smooth" });
                    }
                  }}
                  style={{ color: "white", padding: 4 }}
                >
                  <ChevronRight fontSize="small" />
                </IconButton>
              )}
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

export default memo(ProductCard);
