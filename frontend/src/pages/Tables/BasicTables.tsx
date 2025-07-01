import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import UserManagementTable from "../../components/tables/BasicTables/UserManagementTable";

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Employee Tables" />
      <div className="space-y-6">
          <UserManagementTable/>
      </div>
    </>
  );
}
