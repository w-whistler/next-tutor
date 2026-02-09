import { Box } from "@material-ui/core";
import TopBar from "./TopBar";

export default function ShopLayout({
  children,
}) {
  return (
    <>
      <TopBar />
      <Box p={2}>
        <Box className="flex gap-2 h-[60vh]">
          <Box className="flex-1 overflow-auto bg-gray-50">Category Menu</Box>
          <Box className="flex-2 overflow-hidden bg-gray-100">Ads Slider</Box>
          <Box className="flex-1 overflow-auto bg-gray-50">Recommended</Box>
        </Box>
        <Box mt={3}>{children}</Box>
      </Box>
    </>
  );
}
