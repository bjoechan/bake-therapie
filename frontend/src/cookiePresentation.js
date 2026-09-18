// Purely visual/marketing details that aren't part of the Product data model
// (see .github/copilot-instructions.md), keyed by product name so they can stay
// paired with whichever cookie the backend returns under that name.
const cookiePresentation = {
  "Ruth's Chocolate Chips": {
    notes: ["brown butter", "semi-sweet", "Belgian dark chocolate"],
    alt: "A rich chocolate chip cookie with glossy pools of chocolate.",
    accent: "#8b4f35",
    wash: "#f3d8c8",
  },
  "Ash's Daily Matcha": {
    notes: ["Matcha", "Belgian white chocolate", "smooth finish"],
    alt: "A matcha cookie with chunks of white chocolate.",
    accent: "#597a42",
    wash: "#e7efd8",
  },
  "Charlie's Triple Chocolate": {
    notes: ["rich cocoa", "triple chocolate", "decadent bite"],
    alt: "A dark cocoa cookie with multiple chocolate mix-ins.",
    accent: "#4a2d26",
    wash: "#ebdfd8",
  },
  "Lotso's Strawberry Basket": {
    notes: ["strawberry", "sweet crumb", "fruity pop"],
    alt: "A vibrant red cookie with a soft center.",
    accent: "#a32639",
    wash: "#f4dbe0",
  },
  "Garfield's Morning Brew": {
    notes: ["Japanese coffee", "toasted almond", "deep roast"],
    alt: "A coffee-toned cookie topped with almond slivers.",
    accent: "#5a4638",
    wash: "#efe6de",
  },
  "Earl's Rubies": {
    notes: ["Earl Grey", "dried cranberries", "tart finish"],
    alt: "A cookie with floral notes and cranberry accents.",
    accent: "#6d5660",
    wash: "#efe6ea",
  },
};

const fallbackPresentation = {
  notes: [],
  alt: "",
  accent: "#8b4f35",
  wash: "#f3d8c8",
};

export function getCookiePresentation(name) {
  return cookiePresentation[name] ?? fallbackPresentation;
}
