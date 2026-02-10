import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Popper,
  Typography,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, ChevronRight } from "@material-ui/icons";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { categories } from "../../data/shopData";

export default function CategoryDrawer() {
  const [selectedId, setSelectedId] = useState(null);
  const [expandedLevel2Id, setExpandedLevel2Id] = useState(null);
  const [drawerHeight, setDrawerHeight] = useState(200);
  const containerRef = useRef(null);
  const selected = categories.find(function (c) {
    return c.id === selectedId;
  });

  useEffect(function () {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const setHeight = function () {
      setDrawerHeight(el.clientHeight);
    };
    setHeight();
    const ro = new ResizeObserver(setHeight);
    ro.observe(el);
    return function () {
      ro.disconnect();
    };
  }, []);

  function handleLevel1Click(parentId) {
    setSelectedId(selectedId === parentId ? null : parentId);
    setExpandedLevel2Id(null);
  }

  function handleLevel2Click(childId, hasChildren) {
    if (hasChildren) {
      setExpandedLevel2Id(expandedLevel2Id === childId ? null : childId);
    }
  }

  return (
    <Paper
      ref={containerRef}
      style={{
        height: "100%",
        width: "100%",
        overflow: "auto",
        position: "relative",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        minHeight={0}
      >
        <Box py={1} px={1} flexShrink={0}>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            Categories
          </Typography>
        </Box>
        <List dense disablePadding style={{ flex: 1, minHeight: 0 }}>
          {categories.map(function (parent) {
            return (
              <ListItem
                key={parent.id}
                button
                selected={selectedId === parent.id}
                onClick={function () {
                  handleLevel1Click(parent.id);
                }}
              >
                <ListItemText
                  primary={parent.label}
                  primaryTypographyProps={{ variant: "body2" }}
                />
                <ChevronRight fontSize="small" />
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Popper
        open={Boolean(selectedId && selected)}
        anchorEl={containerRef.current}
        placement="right-start"
        style={{ zIndex: 1300 }}
        modifiers={{
          flip: { enabled: false },
          preventOverflow: { enabled: true, boundariesElement: "viewport" },
        }}
      >
        <Paper
          elevation={4}
          style={{
            height: drawerHeight,
            minWidth: 180,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box py={1} px={1.5} flexShrink={0}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              {selected ? selected.label : ""}
            </Typography>
          </Box>
          <List dense disablePadding style={{ flex: 1, overflow: "auto" }}>
            {selected && selected.children
              ? selected.children.map(function (child) {
                  const hasChildren =
                    child.children && child.children.length > 0;
                  const isExpanded = expandedLevel2Id === child.id;
                  return (
                    <Box key={child.id}>
                      {hasChildren ? (
                        <ListItem
                          style={{ borderRadius: 4, marginBottom: 2 }}
                          disableGutters
                        >
                          <Link
                            href={`/shop/category?id=${child.id}`}
                            passHref
                            style={{ flex: 1, minWidth: 0 }}
                          >
                            <ListItemText
                              primary={child.label}
                              primaryTypographyProps={{ variant: "body2" }}
                            />
                          </Link>
                          <IconButton
                            size="small"
                            onClick={function () {
                              handleLevel2Click(child.id, true);
                            }}
                          >
                            {isExpanded ? (
                              <ExpandLess fontSize="small" />
                            ) : (
                              <ExpandMore fontSize="small" />
                            )}
                          </IconButton>
                        </ListItem>
                      ) : (
                        <Link
                          href={`/shop/category?id=${child.id}`}
                          passHref
                          style={{ display: "block", marginBottom: 2 }}
                        >
                          <ListItem button component="a" style={{ borderRadius: 4 }}>
                            <ListItemText
                              primary={child.label}
                              primaryTypographyProps={{ variant: "body2" }}
                            />
                          </ListItem>
                        </Link>
                      )}
                      {hasChildren && (
                        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                          <List dense disablePadding component="div">
                            {child.children.map(function (grandchild) {
                              return (
                                <Link
                                  href={`/shop/category?id=${grandchild.id}`}
                                  key={grandchild.id}
                                  passHref
                                >
                                  <ListItem
                                    button
                                    component="a"
                                    style={{
                                      paddingLeft: 32,
                                      borderRadius: 4,
                                      marginBottom: 2,
                                    }}
                                  >
                                    <ListItemText
                                      primary={grandchild.label}
                                      primaryTypographyProps={{
                                        variant: "body2",
                                      }}
                                    />
                                  </ListItem>
                                </Link>
                              );
                            })}
                          </List>
                        </Collapse>
                      )}
                    </Box>
                  );
                })
              : null}
          </List>
        </Paper>
      </Popper>
    </Paper>
  );
}
