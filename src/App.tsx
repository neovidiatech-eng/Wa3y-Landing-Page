import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layouts/Layout";
import { appStyles } from "./styles/appStyles";
import { Home } from "./pages/Home/Home";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { SubjectDetails } from "./pages/SubjectDetails";
import { Plans } from "./pages/Plans";
import { Testimonials } from "./pages/Testimonials";
import { Contact } from "./pages/Contact";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Applicstion from "./pages/Application/Applicstion";

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.language || "ar";
    document.documentElement.dir = lang.startsWith("ar") ? "rtl" : "ltr";
    document.documentElement.lang = lang.startsWith("ar") ? "ar" : "en";
  }, [i18n.language]);

  return (
    <>
      <style>{appStyles}</style>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="subjects" element={<Services />} />
            <Route path="subjects/:id" element={<SubjectDetails />} />
            <Route path="plans" element={<Plans />} />
            <Route path="contact" element={<Contact />} />
            <Route path="application" element={<Applicstion />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
