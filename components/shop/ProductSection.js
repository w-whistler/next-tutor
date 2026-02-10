import { Box, Button, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import ProductCard from "./ProductCard";

const INITIAL_COUNT = 4;

export default function ProductSection({ title, products }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? products : products.slice(0, INITIAL_COUNT);
  const hasMore = products.length > INITIAL_COUNT;

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {visible.map((p) => (
          <Grid item xs={6} sm={4} md={3} key={p.id}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
      {hasMore && (
        <Box mt={2} display="flex" justifyContent="center">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show less" : "View More"}
          </Button>
        </Box>
      )}
    </Box>
  );
}
