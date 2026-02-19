import { useRouter } from "next/router";
import Link from "next/link";
import {
  Badge,
  Box,
  FormControl,
  FormControlLabel,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
} from "@material-ui/core";
import { Search as SearchIcon, ShoppingCartOutlined } from "@material-ui/icons";
import { useState, useEffect, useContext, memo } from "react";
import { CartContext } from "../../context/CartContext";
import { getCategories } from "../../lib/shopApi";

const SORT_OPTIONS = [
  { value: "", label: "Sort by" },
  { value: "recommendation", label: "Recommendation" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const SCROLL_THRESHOLD_DOWN = 28;
const SCROLL_THRESHOLD_UP = 12;
const TOPBAR_HEIGHT_DEFAULT = 64;
const TOPBAR_HEIGHT_SMALL = 48;

function ShopSecondaryBar() {
  const router = useRouter();
  const { cart } = useContext(CartContext);
  const { q = "", sort = "", category = "", onsale = "" } = router.query;
  const [searchQuery, setSearchQuery] = useState(q);
  const [sortBy, setSortBy] = useState(sort);
  const [filterCategory, setFilterCategory] = useState(category);
  const [onSaleOnly, setOnSaleOnly] = useState(onsale === "1");
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(function () {
    let cancelled = false;
    getCategories()
      .then(function (data) {
        if (!cancelled) setCategories(data);
      })
      .catch(function () {
        if (!cancelled) setCategories([]);
      });
    return function () {
      cancelled = true;
    };
  }, []);

  useEffect(
    function () {
      if (typeof window === "undefined") return;
      let rafId = null;
      let lastScrollY = window.scrollY;
      function onScroll() {
        if (rafId !== null) return;
        rafId = requestAnimationFrame(function () {
          rafId = null;
          const y = window.scrollY;
          if (y !== lastScrollY) {
            lastScrollY = y;
            setScrolled(function (prev) {
              if (y > SCROLL_THRESHOLD_DOWN) return true;
              if (y < SCROLL_THRESHOLD_UP) return false;
              return prev;
            });
          }
        });
      }
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return function () {
        window.removeEventListener("scroll", onScroll);
        if (rafId !== null) cancelAnimationFrame(rafId);
      };
    },
    []
  );

  useEffect(() => {
    setSearchQuery(typeof q === "string" ? q : "");
    setSortBy(typeof sort === "string" ? sort : "");
    setFilterCategory(typeof category === "string" ? category : "");
    setOnSaleOnly(onsale === "1");
  }, [q, sort, category, onsale]);

  const applySearch = (overrides = {}) => {
    const params = new URLSearchParams();
    const newQ = overrides.q !== undefined ? overrides.q : searchQuery;
    const newSort = overrides.sort !== undefined ? overrides.sort : sortBy;
    const newCategory = overrides.category !== undefined ? overrides.category : filterCategory;
    const newOnSale = overrides.onsale !== undefined ? overrides.onsale : onSaleOnly;
    if (newQ && typeof newQ === "string") params.set("q", newQ.trim());
    if (newSort) params.set("sort", newSort);
    if (newCategory) params.set("category", newCategory);
    if (newOnSale) params.set("onsale", "1");
    const queryString = params.toString();
    router.push(`/shop/search${queryString ? `?${queryString}` : ""}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    applySearch({ q: searchQuery });
  };

  const handleSortChange = (e) => {
    const v = e.target.value;
    setSortBy(v);
    applySearch({ sort: v });
  };

  const handleCategoryChange = (e) => {
    const v = e.target.value;
    setFilterCategory(v);
    applySearch({ category: v });
  };

  const handleOnSaleChange = (e) => {
    const v = e.target.checked;
    setOnSaleOnly(v);
    applySearch({ onsale: v });
  };

  const topOffset = scrolled ? TOPBAR_HEIGHT_SMALL : TOPBAR_HEIGHT_DEFAULT;

  return (
    <Paper
      elevation={1}
      square
      style={{
        position: "sticky",
        top: topOffset,
        zIndex: 1099,
        transition: "top 0.2s ease",
      }}
    >
      <Box
        px={2}
        py={scrolled ? 0.75 : 1.5}
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        style={{ transition: "padding 0.2s ease" }}
      >
        <form onSubmit={handleSearchSubmit} style={{ display: "flex", alignItems: "center", flex: "1 1 200px", minWidth: 200, marginRight: 16 }}>
          <Box
            display="flex"
            alignItems="center"
            border={1}
            borderColor="grey.400"
            borderRadius={4}
            px={1}
            flex={1}
          >
            <SearchIcon style={{ color: "grey.600", marginRight: 8 }} />
            <InputBase
              placeholder="Search products…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              inputProps={{ "aria-label": "search" }}
            />
          </Box>
          <Box component="button" type="submit" ml={1} px={2} py={1} bgcolor="primary.main" color="primary.contrastText" border={0} borderRadius={4} style={{ cursor: "pointer", fontWeight: 500 }}>
            Search
          </Box>
        </form>
        <Box display="flex" alignItems="center" flexWrap="wrap">
          <FormControl size="small" style={{ minWidth: 160, marginRight: 12 }}>
            <InputLabel id="sort-label">Sort by</InputLabel>
            <Select
              labelId="sort-label"
              value={sortBy}
              onChange={handleSortChange}
              label="Sort by"
            >
              {SORT_OPTIONS.map((opt) => (
                <MenuItem key={opt.value || "default"} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" style={{ minWidth: 160 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={filterCategory}
              onChange={handleCategoryChange}
              label="Category"
            >
              <MenuItem value="">All categories</MenuItem>
              {categories.map((parent) => (
                <MenuItem key={parent.id} value={parent.id}>
                  {parent.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={onSaleOnly}
                onChange={handleOnSaleChange}
                color="primary"
                size="small"
              />
            }
            label="On sale"
            style={{ marginLeft: 12 }}
          />
          <Link href="/shop/cart" passHref>
            <IconButton color="primary" aria-label="Cart" style={{ marginLeft: 8 }}>
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </Box>
      </Box>
    </Paper>
  );
}

export default memo(ShopSecondaryBar);
