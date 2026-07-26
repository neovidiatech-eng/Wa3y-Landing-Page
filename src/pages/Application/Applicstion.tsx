import ApplicationForm from "./components/ApplicationForm";
import HeroSection from "./components/DetailsSection";
import MainConditions from "./components/MainConditions";

export default function Applicstion() {
  return (
    <div className="px-10">
        <HeroSection/>
        <MainConditions/>
        <ApplicationForm/>
    </div>
  )
}
