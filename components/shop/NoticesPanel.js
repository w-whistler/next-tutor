import { Box, Paper, Typography } from "@material-ui/core";
import { memo } from "react";
import { importantNotices } from "../../data/shopData";

function NoticesPanel() {
  return (
    <Paper style={{ height: "100%", overflow: "auto" }}>
      <Box p={1}>
        <Typography variant="subtitle1" gutterBottom>
          Notices & Highlights
        </Typography>
        {importantNotices.map((n) => (
          <Box
            key={n.id}
            py={1}
            px={1}
            mb={0.5}
            bgcolor="grey.100"
            borderRadius={4}
          >
            <Typography variant="body2">{n.text}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default memo(NoticesPanel);
