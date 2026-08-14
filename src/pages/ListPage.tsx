import ProductHeader from "@/components/product/ProductHeader";
import DashboardLayout from "@/components/reusable/DashboardLayout";
import List from "@/components/task/List";
const ListPage = () => {
  return (
    <div className="bg-[#F9FBFA] dark:bg-background min-w-0">
      <DashboardLayout>
        <ProductHeader />
        <div className="min-w-0">
          <div className="mx-4 sm:mx-6 lg:mx-8 min-w-0">
            <List />
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default ListPage;
