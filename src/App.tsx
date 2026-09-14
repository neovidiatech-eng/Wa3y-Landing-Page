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
import Applicstion from "./pages/Application/SupervisorApplicstion";
import TeacherApplication from "./pages/Application/TeacherApplication";
import JoinUs from "./pages/JoinUs/JoinUs";

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const updateDir = (lng: string) => {
      const currentLng = lng || "ar";
      const isAr = currentLng.startsWith("ar");
      document.documentElement.dir = isAr ? "rtl" : "ltr";
      document.documentElement.lang = isAr ? "ar" : "en";
    };

    updateDir(i18n.language);
    i18n.on("languageChanged", updateDir);

    return () => {
      i18n.off("languageChanged", updateDir);
    };
  }, [i18n]);

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
            <Route path="supervisor-application" element={<Applicstion />} />
            <Route path="teacher-application" element={<TeacherApplication />} />
            <Route path="join-us" element={<JoinUs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
