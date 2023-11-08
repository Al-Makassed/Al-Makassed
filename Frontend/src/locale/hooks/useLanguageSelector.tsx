import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const useLanguageSelector = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.body.dir = i18next.language === "ar" ? "rtl" : "ltr";
    document.title = t("AppTitle");
  }, [t]);
};

export default useLanguageSelector;
