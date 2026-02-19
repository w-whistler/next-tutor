import { Box, Paper, Typography } from "@material-ui/core";
import { useState, useEffect, memo } from "react";
import { getAds } from "../../lib/shopApi";

const AUTO_ADVANCE_MS = 4000;

function AdsSlider() {
  const [adsSlides, setAdsSlides] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(function () {
    let cancelled = false;
    getAds()
      .then(function (data) {
        if (!cancelled) setAdsSlides(Array.isArray(data) ? data : []);
      })
      .catch(function () {
        if (!cancelled) setAdsSlides([]);
      });
    return function () {
      cancelled = true;
    };
  }, []);

  useEffect(function () {
    if (adsSlides.length <= 1) return;
    const t = setInterval(function () {
      setIndex(function (i) {
        return (i + 1) % adsSlides.length;
      });
    }, AUTO_ADVANCE_MS);
    return function () {
      clearInterval(t);
    };
  }, [adsSlides.length]);

  const slide = adsSlides[index] || null;
  const imageUrl = slide ? slide.image || null : null;

  if (adsSlides.length === 0) {
    return (
      <Paper style={{ height: "100%", minHeight: 360, position: "relative", overflow: "hidden" }}>
        <Box position="absolute" top={0} left={0} right={0} bottom={0} bgcolor="grey.200" display="flex" alignItems="center" justifyContent="center">
          <Typography color="textSecondary">Loading…</Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      style={{
        height: "100%",
        minHeight: 360,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {imageUrl ? (
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "url(" + imageUrl + ")",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ) : (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgcolor="primary.main"
        />
      )}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{
          backgroundColor: "rgba(0,0,0,0.35)",
        }}
      >
        <Box textAlign="center" p={2}>
          <Typography variant="h5" style={{ color: "white", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
            {slide ? slide.title : ""}
          </Typography>
          <Typography variant="body1" style={{ color: "rgba(255,255,255,0.95)", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
            {slide ? slide.subtitle : ""}
          </Typography>
        </Box>
      </Box>
      <Box
        position="absolute"
        bottom={8}
        left={0}
        right={0}
        display="flex"
        justifyContent="center"
      >
        {adsSlides.map(function (_, i) {
          return (
            <Box
              key={i}
              onClick={function () {
                setIndex(i);
              }}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: i === index ? "white" : "rgba(255,255,255,0.4)",
                margin: "0 4px",
                cursor: "pointer",
              }}
            />
          );
        })}
      </Box>
    </Paper>
  );
}

export default memo(AdsSlider);
