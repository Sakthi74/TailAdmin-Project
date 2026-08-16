import ProductHeader from "@/components/product/ProductHeader";
import  Kanban  from "../components/task/Kanban";
import DashboardLayout from "@/components/reusable/DashboardLayout";

const KanbanPage = () => {
  return (
    <div className="bg-[#F9FBFA] dark:bg-background min-w-0">
      <DashboardLayout>
        <ProductHeader />
        <div className="min-w-0">
          <div className="mx-4 sm:mx-6 lg:mx-8 min-w-0">
          <Kanban/>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default KanbanPage;
