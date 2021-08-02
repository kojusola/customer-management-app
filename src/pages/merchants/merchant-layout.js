import MainLayout from 'layouts/main-layout'
//Logos
import { ReactComponent as HomeLogo } from "assets/icons/icon-home.svg";
import { ReactComponent as PurchaseLogo } from "assets/icons/icon-purchase.svg";
// import ReportLogo from "assets/icons/icon-report.svg";
import { ReactComponent as SalesLogo } from "assets/icons/icon-sales.svg";
import { ReactComponent as SettingsLogo } from "assets/icons/icon-settings.svg";
import { ReactComponent as StockLogo } from "assets/icons/icon-stock.svg";

const sidenavs = [
    {
        path: () => '/dashboard',
        title: () => 'Dashboard',
        icon: () => <HomeLogo />,
    },
    {
        path: () => '/quotes',
        title: () => 'Quotes',
        icon: () => <PurchaseLogo />,
    },
    {
        path: () => '/sales',
        title: () => 'Sales',
        icon: () => <SalesLogo />,
    },
    {
        path: () => '/inventory',
        title: () => 'Inventory',
        icon: () => <StockLogo />,
    },
    {
        path: () => '/settings',
        title: () => 'Settings',
        icon: () => <SettingsLogo />,
    },
]


function MerchantLayout({ children }) {
    return (
        <MainLayout sidenavLinks={sidenavs}>
            {children}
        </MainLayout>
    )
}

export default MerchantLayout
