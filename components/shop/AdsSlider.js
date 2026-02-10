import { Box, Paper, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import { adsSlides } from "../../data/shopData";

const AUTO_ADVANCE_MS = 4000;

export default function AdsSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % adsSlides.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(t);
  }, []);

  const slide = adsSlides[index];
  return (
    <Paper
      style={{
        height: "100%",
        minHeight: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "primary.main",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box textAlign="center" p={2}>
        <Typography variant="h5">{slide.title}</Typography>
        <Typography variant="body1">{slide.subtitle}</Typography>
      </Box>
      <Box
        position="absolute"
        bottom={8}
        left={0}
        right={0}
        display="flex"
        justifyContent="center"
      >
        {adsSlides.map((_, i) => (
          <Box
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: i === index ? "white" : "rgba(255,255,255,0.4)",
              margin: "0 4px",
              cursor: "pointer",
            }}
          />
        ))}
      </Box>
    </Paper>
  );
}
