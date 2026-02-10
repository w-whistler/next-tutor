import { useRouter } from "next/router";
import {
  Box,
  FormControl,
  FormControlLabel,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { categories } from "../../data/shopData";

const SORT_OPTIONS = [
  { value: "", label: "Sort by" },
  { value: "recommendation", label: "Recommendation" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

export default function ShopSecondaryBar() {
  const router = useRouter();
  const { q = "", sort = "", category = "", onsale = "" } = router.query;
  const [searchQuery, setSearchQuery] = useState(q);
  const [sortBy, setSortBy] = useState(sort);
  const [filterCategory, setFilterCategory] = useState(category);
  const [onSaleOnly, setOnSaleOnly] = useState(onsale === "1");

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

  return (
    <Paper elevation={1} square>
      <Box px={2} py={1.5} display="flex" flexWrap="wrap" alignItems="center">
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
        </Box>
      </Box>
    </Paper>
  );
}
