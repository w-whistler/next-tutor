import { Box, IconButton } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { useState } from "react";

export default function ProductImageSlider(props) {
  var images = props.images;
  if (!images || !images.length) images = [];
  var list = images.length ? images : ["https://picsum.photos/seed/placeholder/400/400"];
  var _useState = useState(0),
    index = _useState[0],
    setIndex = _useState[1];
  var current = list[index];

  return (
    <Box style={{ overflow: "hidden", maxWidth: 360 }}>
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
          px={1}
          style={{
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "flex-start",
            overflowX: "auto",
            overflowY: "hidden",
            maxHeight: 72,
          }}
        >
          {list.map(function (img, i) {
            var isSelected = i === index;
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
      )}
    </Box>
  );
}
