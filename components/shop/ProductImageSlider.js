import { Box, IconButton, Paper, Typography } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { useState } from "react";

export default function ProductImageSlider({ images = [] }) {
  const [index, setIndex] = useState(0);
  const list = images.length ? images : [null];
  const current = list[index];

  return (
    <Paper style={{ overflow: "hidden" }}>
      <Box position="relative" minHeight={320} bgcolor="grey.200">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height={320}
        >
          <Typography variant="body1" color="textSecondary">
            Image {index + 1}
          </Typography>
        </Box>
        {list.length > 1 && (
          <>
            <IconButton
              style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}
              onClick={() => setIndex((i) => (i - 1 + list.length) % list.length)}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}
              onClick={() => setIndex((i) => (i + 1) % list.length)}
            >
              <ChevronRight />
            </IconButton>
          </>
        )}
      </Box>
      {list.length > 1 && (
        <Box display="flex" justifyContent="center" py={1}>
          {list.map((_, i) => (
            <Box
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: i === index ? "primary.main" : "grey.400",
                margin: "0 4px",
                cursor: "pointer",
              }}
            />
          ))}
        </Box>
      )}
    </Paper>
  );
}
