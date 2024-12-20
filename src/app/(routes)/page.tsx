import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { CardSummary } from "./components/CardSummary";
import { BookOpenCheck, UsersRound, Waypoints } from "lucide-react";
import { LastCustomers } from "./components/LastCustomers";
import { SalesDistributors } from "./components/SalesDistributors";
import { TotalSuscribers } from "./components/TotalSuscribers";
import { ListIntegrations } from "./components/ListIntegrations";

export const dataCardsSummary = [
  {
    icon: UsersRound,
    total: "23.450",
    average: 15,
    title: "Entregas totales",
    tooltipText: "See all of the companies created",
  },
  {
    icon: Waypoints,
    total: "86.6%",
    average: 80,
    title: "Satisfacción del cliente",
    tooltipText: "See all of the revenue",
  },
  {
    icon: BookOpenCheck,
    total: "3240.,32$",
    average: 23,
    title: "Rentabilidad de viajes",
    tooltipText: "See all of the bounce rate",
  },
];

function HomePage() {
  return (
    <div>
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-20">
        {dataCardsSummary.map(
          ({ icon, total, average, title, tooltipText }) => (
            <CardSummary
              key={title}
              icon={icon}
              total={total}
              average={average}
              title={title}
              tooltipText={tooltipText}
            />
          )
        )}
      </div>
      <div className="grid grid-cols-1 mt-12 xl:grid-cols-2 md:gap-x-10">
        <LastCustomers />
        <SalesDistributors />
      </div>
      <div className="flex-col justify-center mt-12 md:gap-x-10 xl:flex xl:flex-row gap-y-4 md:gap-y-0 md:mb-10">
        <TotalSuscribers />
        <ListIntegrations />
      </div>
    </div>
  );
}

export default HomePage;
