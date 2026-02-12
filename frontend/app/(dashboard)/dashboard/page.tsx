import { Metadata } from "next";
import DashboardClient from "./dashboard-client"; // Panggil file yang barusan direname

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return <DashboardClient />;
}
