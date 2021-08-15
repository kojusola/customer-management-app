import MainLayout from 'layouts/main-layout'
//Logos
import { ReactComponent as HomeLogo } from "assets/icons/icon-home.svg";
import { ReactComponent as PurchaseLogo } from "assets/icons/icon-purchase.svg";
// import ReportLogo from "assets/icons/icon-report.svg";
import { ReactComponent as SalesLogo } from "assets/icons/icon-sales.svg";
import { ReactComponent as SettingsLogo } from "assets/icons/icon-settings.svg";
import { ReactComponent as StockLogo } from "assets/icons/icon-stock.svg";
import PersonLogo from "@material-ui/icons/Person";

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
        path: () => '/customers',
        title: () => 'Customers',
        icon: () => <PersonLogo style={{ fill: '#000', fontSize: 28, border: 'solid #000', borderRadius: '50%' }} />,
    },
    {
        path: () => '/settings',
        title: () => 'Settings',
        icon: () => <SettingsLogo />,
    },
]


function MerchantLayout({ children, toggleSelectUser, toggleAddCustomer }) {
    return (
        <MainLayout sidenavLinks={sidenavs} toggleAddCustomer={toggleAddCustomer} toggleSelectUser={toggleSelectUser}>
            {children}
        </MainLayout>
    )
}

export default MerchantLayout
