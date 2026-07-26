import { Link } from "react-router-dom";
import { IslamicPattern } from "../IslamicPattern";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-dark py-10 relative overflow-hidden mt-auto">
        <IslamicPattern className="absolute inset-0 opacity-5" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm">
              {t("footer.rights", { year: new Date().getFullYear() })}
            </p>
            <p className="text-gray-500 text-sm">
              {t("footer.designedBy")}{" "}
              <span className="text-teal-500 font-bold">neovidia</span>
            </p>
            <div className="flex gap-8">
              <Link to="/privacy" className="text-gray-500 hover:text-white text-xs">
                {t("footer.privacyPolicy")}
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-primary text-xs">
                {t("footer.termsConditions")}
              </Link>
            </div>
          </div>
        </div>
      </footer>
        )
}
