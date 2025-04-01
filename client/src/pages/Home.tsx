import { AppDownload } from "../components/AppDownload";
import { Hero } from "../components/Hero";
import { JobListing } from "../components/JobListing";
import { Navbar } from "../components/Navbar";

export function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <JobListing />
      <AppDownload />
    </div>
  );
}
