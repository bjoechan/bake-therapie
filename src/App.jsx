import React from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

const instagramUrl = "https://www.instagram.com/bake.therapie.ca/";

const cookies = [
  {
    id: "brown-butter",
    name: "Ruth's Chocolate Chips",
    kicker: "Cookie drop classic",
    summary:
      "Rich brown butter dough loaded with semi-sweet and Belgian dark chocolate.",
    notes: ["brown butter", "semi-sweet", "Belgian dark chocolate"],
    image: "/images/closeups/ruth-chocolate-chips.png",
    alt: "A rich chocolate chip cookie with glossy pools of chocolate.",
    accent: "#8b4f35",
    wash: "#f3d8c8",
  },
  {
    id: "pistachio-rose",
    name: "Ash's Daily Matcha",
    kicker: "Earthy and creamy",
    summary:
      "Earthy Japanese matcha paired with smooth Belgian white chocolate.",
    notes: ["Japanese matcha", "Belgian white chocolate", "smooth finish"],
    image: "/images/closeups/ash-daily-matcha.png",
    alt: "A matcha cookie with chunks of white chocolate.",
    accent: "#597a42",
    wash: "#e7efd8",
  },
  {
    id: "matcha-white",
    name: "Charlie's Triple Chocolate",
    kicker: "For chocolate lovers",
    summary: "Rich cocoa cookie loaded with three varieties of chocolate.",
    notes: ["rich cocoa", "triple chocolate", "decadent bite"],
    image: "/images/closeups/charlie-triple-chocolate.png",
    alt: "A dark cocoa cookie with multiple chocolate mix-ins.",
    accent: "#4a2d26",
    wash: "#ebdfd8",
  },
  {
    id: "red-velvet",
    name: "Lotso's Strawberry Basket",
    kicker: "Bright and fruity",
    summary: "Sweet cookie bursting with bright, strawberry flavor.",
    notes: ["strawberry", "sweet crumb", "fruity pop"],
    image: "/images/closeups/lotso-strawberry-basket.png",
    alt: "A vibrant red cookie with a soft center.",
    accent: "#a32639",
    wash: "#f4dbe0",
  },
  {
    id: "cookies-cream",
    name: "Garfield's Morning Brew",
    kicker: "Bold coffee hit",
    summary: "Bold Japanese coffee cookie topped with toasted almond slivers.",
    notes: ["Japanese coffee", "toasted almond", "deep roast"],
    image: "/images/closeups/garfield-morning-brew.png",
    alt: "A coffee-toned cookie topped with almond slivers.",
    accent: "#5a4638",
    wash: "#efe6de",
  },
  {
    id: "salted-caramel",
    name: "Earl's Rubies",
    kicker: "Fragrant tea notes",
    summary: "Fragrant Earl Grey cookie dotted with tart dried cranberries.",
    notes: ["Earl Grey", "dried cranberries", "tart finish"],
    image: "/images/closeups/earl-rubies.png",
    alt: "A cookie with floral notes and cranberry accents.",
    accent: "#6d5660",
    wash: "#efe6ea",
  },
];

function App() {
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          mt: 1.5,
          px: { xs: 1, md: 2 },
          bgcolor: "transparent",
          pointerEvents: "none",
        }}
      >
        <Toolbar
          sx={{
            display: { xs: "grid", sm: "flex" },
            gridTemplateColumns: { xs: "1fr auto 58px" },
            gridTemplateAreas: { xs: '"name logo icon"' },
            alignItems: "center",
            pointerEvents: "auto",
            minHeight: { xs: 64, sm: 72 },
            borderRadius: 99,
            border: "1px solid rgba(34, 26, 18, 0.14)",
            bgcolor: "rgba(255, 249, 241, 0.84)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 18px 48px rgba(26, 19, 13, 0.12)",
            gap: { xs: 0.6, sm: 1 },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 0.7, sm: 1.1, md: 1.2 }}
            sx={{
              display: { xs: "contents", sm: "flex" },
              mr: { sm: 1 },
              minWidth: { sm: 0 },
              minHeight: { xs: 50, sm: 60 },
              flex: { sm: 1 },
            }}
          >
            <Box
              component="img"
              src="/images/logo.svg"
              alt="Bake Thérapie logo"
              sx={{
                width: { xs: 120, sm: 165, md: 205 },
                height: { xs: 40, sm: 54, md: 64 },
                objectFit: "contain",
                objectPosition: "center",
                transform: {
                  xs: "translateY(2px)",
                  sm: "translateY(1px)",
                  md: "translateY(0px)",
                },
                display: "block",
                gridArea: { xs: "logo" },
                gridColumn: { xs: 2 },
                justifySelf: { xs: "center" },
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.1rem", sm: "1.35rem", md: "1.62rem" },
                lineHeight: 1.05,
                color: "#2b201c",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gridArea: { xs: "name" },
                gridColumn: { xs: 1 },
                justifySelf: { xs: "start" },
              }}
            >
              Bake Thérapie
            </Typography>
          </Stack>

          <Button
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            color="secondary"
            variant="contained"
            aria-label="Open Instagram"
            startIcon={<InstagramIcon />}
            sx={{
              alignSelf: "center",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gridArea: { xs: "icon" },
              gridColumn: { xs: 3 },
              borderRadius: 99,
              px: { xs: 0, sm: 1.8 },
              py: { xs: 0, sm: 1 },
              width: { xs: 58, sm: "auto" },
              height: { xs: 46, sm: 46 },
              minWidth: { xs: 58, sm: "auto" },
              lineHeight: 1,
              fontWeight: 700,
              "& .MuiButton-startIcon": {
                m: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              },
              "& .MuiSvgIcon-root": {
                fontSize: { xs: "1.85rem", sm: "1.5rem" },
              },
            }}
          >
            <Box
              component="span"
              sx={{ display: { xs: "none", sm: "inline" } }}
            >
              bake.therapie.ca
            </Box>
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="aside"
        aria-label="Jump to cookie section"
        sx={{
          position: "fixed",
          top: { md: "45%", lg: "53%" },
          left: { md: 18, lg: 30 },
          transform: "translateY(-50%)",
          zIndex: 12,
          display: { xs: "none", md: "grid" },
          gap: 1.5,
        }}
      >
        {cookies.map((cookie, index) => (
          <IconButton
            key={cookie.id}
            href={`#${cookie.id}`}
            aria-label={`Jump to ${cookie.name}`}
            size="small"
            sx={{
              width: 40,
              height: 40,
              border: "1px solid rgba(34, 26, 18, 0.2)",
              bgcolor: "rgba(255, 249, 241, 0.86)",
              fontWeight: 700,
              fontSize: "0.74rem",
              "&:hover": { bgcolor: "secondary.main", color: "#fff" },
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </IconButton>
        ))}
      </Box>

      <Box component="main">
        <Box
          id="top"
          component="section"
          sx={{
            minHeight: "100svh",
            display: "grid",
            alignItems: "center",
            px: { xs: 3.5, md: 11 },
            pt: { xs: 12, md: 14 },
            pb: { xs: 9, md: 7 },
            color: "#fff9f1",
            backgroundImage:
              "linear-gradient(90deg, rgba(20, 13, 9, 0.88) 0%, rgba(20, 13, 9, 0.58) 45%, rgba(20, 13, 9, 0.18) 100%), url(/images/hero-cookie-flight.png)",
            backgroundSize: "cover",
            backgroundPosition: { xs: "65% center", md: "56% center" },
          }}
        >
          <Container
            maxWidth="md"
            disableGutters
            sx={{ ml: { xs: 0.5, md: 4 }, pr: { xs: 1, md: 2 } }}
          >
            <Typography
              id="hero-title"
              variant="h1"
              sx={{
                fontSize: { xs: "3.4rem", md: "7rem" },
                lineHeight: 0.9,
                maxWidth: "10ch",
              }}
            >
              Bake Thérapie
            </Typography>

            <Typography
              sx={{
                mt: 2.5,
                maxWidth: 640,
                fontSize: { xs: "1.05rem", md: "1.4rem" },
                color: "rgba(255, 249, 241, 0.9)",
              }}
            >
              Baking was our chef's therapy during stressful times. Now, Bake
              Therapie is here to be yours.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.2}
              sx={{ mt: 3.5 }}
            >
              <Button
                href="#brown-butter"
                variant="contained"
                color="primary"
                startIcon={<ArrowDownwardRoundedIcon />}
                sx={{ borderRadius: 99, py: 1.2, px: 2.2, fontWeight: 800 }}
              >
                View cookies
              </Button>
              <Button
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                variant="outlined"
                color="inherit"
                startIcon={<InstagramIcon />}
                sx={{
                  borderRadius: 99,
                  py: 1.2,
                  px: 2.2,
                  color: "#fff9f1",
                  borderColor: "rgba(255, 249, 241, 0.4)",
                }}
              >
                Instagram
              </Button>
            </Stack>
          </Container>
        </Box>

        {cookies.map((cookie, index) => (
          <CookieSection key={cookie.id} cookie={cookie} index={index} />
        ))}

        <Box
          component="section"
          sx={{
            minHeight: "68svh",
            display: "grid",
            placeItems: "center",
            textAlign: "center",
            px: 2,
            py: 10,
            bgcolor: "#241b17",
            color: "#fff9f1",
          }}
        >
          <Container maxWidth="md">
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              sx={{ mb: 2 }}
            >
              <AutoAwesomeRoundedIcon fontSize="small" />
              <Typography sx={{ fontWeight: 800, fontSize: "0.9rem" }}>
                COOKIE DROPS BY BAKE THÉRAPIE
              </Typography>
            </Stack>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2.8rem", md: "5.2rem" },
                lineHeight: 0.95,
              }}
            >
              Ready for the next box?
            </Typography>
            <Typography
              sx={{
                mt: 2.4,
                mb: 3.5,
                color: "rgba(255, 249, 241, 0.78)",
                fontSize: "1.1rem",
              }}
            >
              Follow the latest cookie drops, flavors, and pickup details on
              Instagram.
            </Typography>
            <Button
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              variant="contained"
              color="primary"
              startIcon={<InstagramIcon />}
              sx={{ borderRadius: 99, py: 1.2, px: 2.4, fontWeight: 800 }}
            >
              bake.therapie.ca
            </Button>
          </Container>
        </Box>

        <Box
          component="footer"
          sx={{
            py: 2.2,
            px: 2,
            bgcolor: "#1a120f",
            borderTop: "1px solid rgba(255, 249, 241, 0.1)",
            textAlign: "center",
          }}
        >
          <Stack spacing={0.4} alignItems="center">
            <Typography
              sx={{
                color: "rgba(255, 249, 241, 0.72)",
                fontSize: "0.82rem",
                letterSpacing: 0.3,
              }}
            >
              © {currentYear} Bake Therapie. All rights reserved.
            </Typography>
            <Typography
              component="a"
              href="mailto:baketherapie@gmail.com"
              sx={{
                color: "rgba(255, 249, 241, 0.9)",
                textDecoration: "none",
                fontSize: "0.86rem",
                letterSpacing: 0.2,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              baketherapie@gmail.com
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

function CookieSection({ cookie, index }) {
  return (
    <Box
      component="section"
      id={cookie.id}
      aria-labelledby={`${cookie.id}-title`}
      sx={{
        px: { xs: 2, md: 7 },
        py: { xs: 7, md: 9 },
        overflowX: "clip",
        background: `linear-gradient(120deg, ${cookie.wash} 0%, #fff9f1 50%, #fff 100%)`,
      }}
    >
      <Card
        elevation={0}
        sx={{
          position: "relative",
          maxWidth: "100%",
          overflow: "hidden",
          border: "1px solid rgba(36, 27, 23, 0.12)",
          borderBottom: `10px solid ${cookie.accent}`,
          borderRadius: 1.5,
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Typography
          aria-hidden="true"
          sx={{
            position: "absolute",
            top: 16,
            right: { xs: 16, md: 28 },
            fontSize: { xs: "4rem", md: "8.5rem" },
            fontWeight: 800,
            lineHeight: 0.88,
            color: cookie.accent,
            opacity: 0.12,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </Typography>

        <Box
          sx={{
            display: "grid",
            minWidth: 0,
            gridTemplateColumns: {
              xs: "1fr",
              md: index % 2 === 1 ? "0.95fr 1.05fr" : "1.05fr 0.95fr",
            },
          }}
        >
          <CardMedia
            component="img"
            image={cookie.image}
            alt={cookie.alt}
            loading="lazy"
            sx={{
              order: { xs: 0, md: index % 2 === 1 ? 2 : 1 },
              aspectRatio: "1 / 1",
              objectFit: "cover",
              p: { xs: 1.2, md: 1.8 },
              borderRadius: 2,
            }}
          />

          <CardContent
            sx={{
              order: { xs: 1, md: index % 2 === 1 ? 1 : 2 },
              px: { xs: 2, md: 4 },
              py: { xs: 2.2, md: 3 },
              minWidth: 0,
              display: "grid",
              alignContent: "center",
              gap: 1.2,
            }}
          >
            <Typography
              sx={{
                color: cookie.accent,
                fontWeight: 800,
                letterSpacing: 0.4,
                fontSize: "0.9rem",
              }}
            >
              {cookie.kicker.toUpperCase()}
            </Typography>
            <Typography
              id={`${cookie.id}-title`}
              variant="h2"
              sx={{
                maxWidth: "100%",
                fontSize: { xs: "2.2rem", sm: "2.7rem", md: "4.2rem" },
                lineHeight: 0.95,
                overflowWrap: "anywhere",
              }}
            >
              {cookie.name}
            </Typography>
            <Typography
              sx={{
                maxWidth: "100%",
                color: "rgba(36, 27, 23, 0.8)",
                fontSize: { xs: "1rem", md: "1.12rem" },
                overflowWrap: "anywhere",
              }}
            >
              {cookie.summary}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              flexWrap="wrap"
              sx={{ mt: 1 }}
            >
              {cookie.notes.map((note) => (
                <Chip
                  key={note}
                  label={note}
                  size="small"
                  sx={{
                    maxWidth: "100%",
                    height: "auto",
                    color: cookie.accent,
                    borderColor: `${cookie.accent}66`,
                    bgcolor: "rgba(255, 255, 255, 0.72)",
                    fontWeight: 700,
                    "& .MuiChip-label": {
                      display: "block",
                      maxWidth: "100%",
                      whiteSpace: "normal",
                      overflowWrap: "anywhere",
                      textAlign: "center",
                      lineHeight: 1.05,
                      py: 0.2,
                    },
                  }}
                  variant="outlined"
                />
              ))}
            </Stack>

            <Button
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              startIcon={<ShoppingBagRoundedIcon />}
              sx={{
                mt: 1.2,
                width: { xs: "100%", sm: "fit-content" },
                borderRadius: 99,
                bgcolor: cookie.accent,
                color: "#fff9f1",
                px: 2.2,
                py: 1,
                fontWeight: 800,
                "&:hover": {
                  bgcolor: cookie.accent,
                  filter: "brightness(0.93)",
                },
              }}
            >
              DM to reserve
            </Button>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}

export default App;
