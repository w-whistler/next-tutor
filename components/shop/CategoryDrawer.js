import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Popper,
  Typography,
} from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
import { useState, useRef, useEffect, memo } from "react";
import Link from "next/link";
import { categories } from "../../data/shopData";

function CategoryDrawer() {
  const [selectedId, setSelectedId] = useState(null);
  const [level2PopperAnchor, setLevel2PopperAnchor] = useState(null);
  const [level2PopperChildren, setLevel2PopperChildren] = useState(null);
  const [drawerHeight, setDrawerHeight] = useState(200);
  const containerRef = useRef(null);
  const firstPopperPaperRef = useRef(null);
  const secondPopperPaperRef = useRef(null);
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

  useEffect(function () {
    function handleClickOutside(event) {
      if (!selectedId) return;
      const target = event.target;
      if (containerRef.current && containerRef.current.contains(target)) return;
      if (firstPopperPaperRef.current && firstPopperPaperRef.current.contains(target)) return;
      if (secondPopperPaperRef.current && secondPopperPaperRef.current.contains(target)) return;
      setSelectedId(null);
      setLevel2PopperAnchor(null);
      setLevel2PopperChildren(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return function () {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedId]);

  function handleLevel1Click(parentId) {
    setSelectedId(selectedId === parentId ? null : parentId);
    setLevel2PopperAnchor(null);
    setLevel2PopperChildren(null);
  }

  function openLevel3Popper(event, children) {
    event.preventDefault();
    event.stopPropagation();
    setLevel2PopperAnchor(event.currentTarget);
    setLevel2PopperChildren(children);
  }

  const level3AnchorEl = firstPopperPaperRef.current || null;

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

      {/* First popper: Level 2 */}
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
          ref={firstPopperPaperRef}
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
                  if (hasChildren) {
                    return (
                      <ListItem
                        key={child.id}
                        button
                        style={{ borderRadius: 4, marginBottom: 2 }}
                        onClick={function (e) {
                          openLevel3Popper(e, child.children);
                        }}
                      >
                        <ListItemText
                          primary={child.label}
                          primaryTypographyProps={{ variant: "body2" }}
                        />
                        <ChevronRight fontSize="small" />
                      </ListItem>
                    );
                  }
                  return (
                    <Link
                      href={`/shop/category?id=${child.id}`}
                      key={child.id}
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
                  );
                })
              : null}
          </List>
        </Paper>
      </Popper>

      {/* Second popper: Level 3 - anchored to first popper panel for same top offset */}
      <Popper
        open={Boolean(level2PopperAnchor && level2PopperChildren && level3AnchorEl)}
        anchorEl={level3AnchorEl}
        placement="right-start"
        style={{ zIndex: 1310 }}
        modifiers={{
          flip: { enabled: false },
          preventOverflow: { enabled: true, boundariesElement: "viewport" },
        }}
      >
        <Paper
          ref={secondPopperPaperRef}
          elevation={4}
          style={{
            height: drawerHeight,
            minWidth: 160,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <List dense disablePadding style={{ flex: 1, overflow: "auto", paddingTop: 8, paddingBottom: 8 }}>
            {level2PopperChildren
              ? level2PopperChildren.map(function (grandchild) {
                  return (
                    <Link
                      href={`/shop/category?id=${grandchild.id}`}
                      key={grandchild.id}
                      passHref
                      style={{ display: "block", marginBottom: 2 }}
                    >
                      <ListItem button component="a" style={{ borderRadius: 4 }}>
                        <ListItemText
                          primary={grandchild.label}
                          primaryTypographyProps={{ variant: "body2" }}
                        />
                      </ListItem>
                    </Link>
                  );
                })
              : null}
          </List>
        </Paper>
      </Popper>
    </Paper>
  );
}

export default memo(CategoryDrawer);
