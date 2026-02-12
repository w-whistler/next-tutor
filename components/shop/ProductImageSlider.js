import { Box, IconButton } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { useState, useRef, useEffect } from "react";

export default function ProductImageSlider(props) {
  const images = props.images && props.images.length > 0 ? props.images : [];
  const list = images.length ? images : ["https://picsum.photos/seed/placeholder/400/400"];
  const [index, setIndex] = useState(0);
  const [showThumbArrows, setShowThumbArrows] = useState(false);
  const thumbScrollRef = useRef(null);
  const roRef = useRef(null);
  const current = list[index];

  useEffect(
    function () {
      if (list.length <= 1) return;
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
    [list.length]
  );

  useEffect(
    function () {
      if (list.length <= 1) return;
      const id = requestAnimationFrame(function () {
        const el = thumbScrollRef.current;
        if (!el) return;
        const thumbWidth = 56;
        const thumbMargin = 8;
        const totalWidth = thumbWidth + thumbMargin;
        const centerOfThumb = index * totalWidth + thumbWidth / 2;
        const scrollLeft = centerOfThumb - el.clientWidth / 2;
        el.scrollLeft = Math.max(0, Math.min(scrollLeft, el.scrollWidth - el.clientWidth));
      });
      return function () {
        cancelAnimationFrame(id);
      };
    },
    [index, list.length]
  );

  return (
    <Box style={{ overflow: "hidden", width: 360, minWidth: 360, flexShrink: 0 }}>
      <Box position="relative" bgcolor="grey.200">
        <Box
          position="relative"
          style={{
            paddingTop: "100%",
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
              backgroundImage: "url(" + current + ")",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Box>
        {list.length > 1 && (
          <>
            <IconButton
              size="small"
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255,255,255,0.8)",
                padding: 4,
              }}
              onClick={function () {
                setIndex((index - 1 + list.length) % list.length);
              }}
            >
              <ChevronLeft fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              style={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255,255,255,0.8)",
                padding: 4,
              }}
              onClick={function () {
                setIndex((index + 1) % list.length);
              }}
            >
              <ChevronRight fontSize="small" />
            </IconButton>
          </>
        )}
      </Box>
      {list.length > 1 && (
        <Box
          py={1.5}
          px={0}
          display="flex"
          alignItems="center"
          style={{ maxHeight: 72, overflow: "hidden" }}
        >
          {showThumbArrows && (
            <IconButton
              size="small"
              onClick={function () {
                if (thumbScrollRef.current) {
                  thumbScrollRef.current.scrollBy({ left: -64, behavior: "smooth" });
                }
              }}
              style={{ padding: 4, flexShrink: 0 }}
            >
              <ChevronLeft fontSize="small" />
            </IconButton>
          )}
          <Box
            ref={thumbScrollRef}
            py={0}
            px={1}
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexWrap: "nowrap",
              justifyContent: "flex-start",
              overflowX: "auto",
              overflowY: "hidden",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
            className="product-slider-thumb-scroll"
          >
            {list.map(function (img, i) {
              const isSelected = i === index;
              return (
                <Box
                  key={i}
                  onClick={function () {
                    setIndex(i);
                  }}
                  style={{
                    width: 56,
                    height: 56,
                    flexShrink: 0,
                    borderRadius: 4,
                    overflow: "hidden",
                    cursor: "pointer",
                    border: isSelected ? "2px solid" : "2px solid transparent",
                    borderColor: isSelected ? "primary.main" : "transparent",
                    boxSizing: "border-box",
                    margin: 4,
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
          {showThumbArrows && (
            <IconButton
              size="small"
              onClick={function () {
                if (thumbScrollRef.current) {
                  thumbScrollRef.current.scrollBy({ left: 64, behavior: "smooth" });
                }
              }}
              style={{ padding: 4, flexShrink: 0 }}
            >
              <ChevronRight fontSize="small" />
            </IconButton>
          )}
        </Box>
      )}
    </Box>
  );
}
