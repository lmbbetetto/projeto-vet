import CardChamada from "@/components/button-chamada";
import ServiceCountCard from "@/components/service-count-card";
import CardAddStudent from "@/components/new-add-student";
import SalesCountCard from "@/components/sales-count-card";
import CostumerCountCard from "@/components/costumer-count-card";
import TableSalles from "@/components/table-salles";

export default function HomeDashboard() {
  return (
    <main className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        <SalesCountCard />
        <CostumerCountCard />
        <ServiceCountCard />
      </div>
      <div className="flex gap-4">
        <CardAddStudent />
        <CardChamada />
      </div>
      <TableSalles />
    </main>
  )
}