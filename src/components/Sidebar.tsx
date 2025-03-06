import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import LoginIcon from '@mui/icons-material/Login';
import Link from "next/link";

interface page {
  title: string;
  url: string;
  icon: any;
}

const pages: page[] = [
  { title: "Home", url: "/home", icon: <HomeIcon sx={{ fontSize: 20 }} /> },
  {
    title: "Inventory",
    url: "/home/inventory",
    icon: <InventoryIcon sx={{ fontSize: 20 }} />,
  },
  {
    title: "Invoice",
    url: "/home/invoice",
    icon: <ReceiptIcon sx={{ fontSize: 20 }} />,
  },
  {
    title: "Sales",
    url: "/home/sales",
    icon: <PointOfSaleIcon sx={{ fontSize: 20 }} />,
  },
  {
    title: "Users",
    url: "/home/users",
    icon: <PersonIcon sx={{ fontSize: 20 }} />,
  },
  {
    title: "Products",
    url: "/home/products",
    icon: <PrecisionManufacturingIcon sx={{ fontSize: 20 }} />,
  },
  {
    title: "Log Out",
    url: "/api/auth/logout",
    icon: <LoginIcon sx={{ fontSize: 20 }} />,
  },
];

function SidebarComponent() {
  return (
    <div className="w-[240px] min-h-dvh border-r border-sidebar-border bg-sidebar-background">
      <div>
        <header className="py-6 flex justify-center border-b border-sidebar-border">
          Invoicing App
        </header>
        <ul className="p-4 text-xl">
          {pages.map((page, index) => (
            <li key={index}>
              <Link
                className="flex items-center my-2 px-2 py-1 gap-2 rounded cursor-pointer text-gray-500 hover:bg-gray-200"
                href={page.url}
              >
                {page.icon} {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SidebarComponent;
