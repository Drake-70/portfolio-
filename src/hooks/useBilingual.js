import { useCallback } from "react";
import { useTranslation } from "react-i18next";

// Content data (src/data/content.js) stores copy as { en, fr } objects.
// This helper resolves the right language with graceful fallback.
// Bilingual helpers: arrays of strings are joined with newlines so callers
// can split("\n") uniformly for strings and arrays.
export function useBilingual() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("fr") ? "fr" : "en";
  return useCallback(
    (field) => {
      if (field == null) return "";
      if (typeof field === "string") return field;
      const val = field[lang] ?? field.en ?? "";
      return Array.isArray(val) ? val.join("\n") : val;
    },
    [lang]
  );
}
