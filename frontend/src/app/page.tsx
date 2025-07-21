"use client";

import { useState } from "react";

type Menu = {
  id: number;
  name: string;
  description: string;
};

const styles = {
  main: {
    width: "90dvw",
    height: "90dvh",
    margin: "5dvh auto",
    padding: "28px",
    backgroundColor: "#FFF9F2",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    fontFamily: "'Comic Neue', cursive, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  } as React.CSSProperties,
  title: {
    fontSize: "30px",
    fontWeight: "700",
    color: "#E07A5F",
    textAlign: "center" as const,
    marginBottom: "28px",
  },
  button: {
    width: "100%",
    padding: "14px",
    fontSize: "17px",
    fontWeight: "600",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.25s ease",
    backgroundColor: "#F4A261",
    color: "#fff",
    boxShadow: "0 2px 6px rgba(244, 162, 97, 0.4)",
  },
  buttonHover: {
    backgroundColor: "#E76F51",
  },
  buttonDisabled: {
    backgroundColor: "#FAD9C1",
    cursor: "not-allowed",
    boxShadow: "none",
  },
  errorText: {
    marginTop: "18px",
    color: "#D62828",
    fontWeight: "600",
    textAlign: "center" as const,
  },
  menuContainer: {
    marginTop: "30px",
    textAlign: "center" as const,
  },
  menuName: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#2A9D8F",
    marginBottom: "14px",
  },
  menuImage: {
    maxHeight: "200px",
    width: "auto",
    borderRadius: "14px",
    border: "6px solid #fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    marginBottom: "14px",
  },
  menuDescription: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "28px",
    fontWeight: "500",
  },
  btnGroup: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
  } as React.CSSProperties,
  greenButton: {
    width: "130px",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#81B29A",
    color: "#fff",
    boxShadow: "0 2px 6px rgba(129, 178, 154, 0.4)",
    transition: "background-color 0.25s ease",
  },
  greenButtonHover: {
    backgroundColor: "#6F9E8B",
  },
  secondaryButton: {
    width: "130px",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#E76F51",
    color: "#fff",
    boxShadow: "0 2px 6px rgba(231, 111, 81, 0.4)",
    transition: "background-color 0.25s ease",
  },
  secondaryButtonHover: {
    backgroundColor: "#D6593E",
  },
};

export default function Home() {
  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState<"search" | "retry" | null>(null);

  const fetchMenu = async () => {
    setLoading(true);
    setError(null);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const res = await fetch(`${backendUrl}/rice_menu`);
      if (!res.ok) throw new Error("メニュー取得に失敗しました");
      const data: Menu = await res.json();
      setMenu(data);
    } catch (e) {
      setError((e as Error).message);
      setMenu(null);
    } finally {
      setLoading(false);
    }
  };

  const openGoogleSearch = () => {
    if (menu) {
      const query = encodeURIComponent(menu.name + " レシピ");
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }
  };

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>ごはんルーレット</h1>

      {!menu && (
        <button
          onClick={fetchMenu}
          disabled={loading}
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {}),
          }}
          type="button"
        >
          {loading ? "ルーレット中..." : "ごはんをルーレットする"}
        </button>
      )}

      {error && <p style={styles.errorText}>{error}</p>}

      {menu && (
        <>
          <div style={styles.menuContainer}>
            <h2 style={styles.menuName}>{menu.name}</h2>
            <img
              src={`/images/${menu.id}.gif`}
              alt={menu.name}
              style={styles.menuImage}
            />
            <p style={styles.menuDescription}>{menu.description}</p>
          </div>

          <div style={styles.btnGroup}>
            <button
              onClick={openGoogleSearch}
              onMouseEnter={() => setHoveredButton("search")}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                ...styles.greenButton,
                ...(hoveredButton === "search" ? styles.greenButtonHover : {}),
              }}
              type="button"
            >
              レシピ検索
            </button>
            <button
              onClick={fetchMenu}
              disabled={loading}
              onMouseEnter={() => setHoveredButton("retry")}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                ...styles.secondaryButton,
                ...(loading ? styles.buttonDisabled : {}),
                ...(hoveredButton === "retry" ? styles.secondaryButtonHover : {}),
              }}
              type="button"
            >
              もう一度
            </button>
          </div>
        </>
      )}
    </main>
  );
}
