import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { DEFAULT_PRODUCTS, DEFAULT_CATEGORIES, DEFAULT_THEMES, DEFAULT_HOME } from "./src/data/defaults";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  const STORE_PATH = path.join(process.cwd(), "menu-store.json");

  // Helper to load current state
  const loadStore = () => {
    try {
      if (fs.existsSync(STORE_PATH)) {
        const data = fs.readFileSync(STORE_PATH, "utf-8");
        return JSON.parse(data);
      }
    } catch (e) {
      console.error("Error reading store, falling back to defaults", e);
    }
    return {
      products: DEFAULT_PRODUCTS,
      categories: DEFAULT_CATEGORIES,
      theme: DEFAULT_THEMES[0],
      homeSettings: DEFAULT_HOME,
    };
  };

  // Helper to save state
  const saveStore = (data: any) => {
    try {
      fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
    } catch (e) {
      console.error("Error writing to store", e);
    }
  };

  // 1. API Endpoints
  app.get("/api/menu", (req, res) => {
    const data = loadStore();
    res.json(data);
  });

  app.post("/api/menu", (req, res) => {
    const { products, categories, theme, homeSettings } = req.body;
    const current = loadStore();
    
    const updated = {
      products: products || current.products,
      categories: categories || current.categories,
      theme: theme || current.theme,
      homeSettings: homeSettings || current.homeSettings,
    };

    saveStore(updated);
    res.json({ success: true, data: updated });
  });

  app.post("/api/menu/reset", (req, res) => {
    const defaultData = {
      products: DEFAULT_PRODUCTS,
      categories: DEFAULT_CATEGORIES,
      theme: DEFAULT_THEMES[0],
      homeSettings: DEFAULT_HOME,
    };
    saveStore(defaultData);
    res.json({ success: true, data: defaultData });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve /src directory statically in production as a fallback for dynamic asset URLs
    app.use("/src", express.static(path.join(process.cwd(), "src")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
