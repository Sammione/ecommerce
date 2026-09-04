import { SalesChart } from './components/SalesChart';
import { OrderStatusChart } from './components/OrderStatusChart';
import { TopProducts } from './components/TopProducts';
import { LowStockAlerts } from './components/LowStockAlerts';
import { QuickActions } from './components/QuickActions';
import { DateRangeFilter } from './components/DateRangeFilter';

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <DateRangeFilter />
      </div>

      <QuickActions />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
           <h3 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2 flex justify-between">
             Total Sales <span className="text-emerald-500 font-bold normal-case">↑ 12%</span>
           </h3>
           <p className="text-3xl font-bold text-[var(--color-brand-navy)]">₦ 2,450,000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
           <h3 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2 flex justify-between">
             Orders <span className="text-emerald-500 font-bold normal-case">↑ 5%</span>
           </h3>
           <p className="text-3xl font-bold text-[var(--color-brand-navy)]">142</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
           <h3 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2 flex justify-between">
             Customers <span className="text-emerald-500 font-bold normal-case">↑ 8%</span>
           </h3>
           <p className="text-3xl font-bold text-[var(--color-brand-navy)]">89</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
           <h3 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2 flex justify-between">
             Avg Order Value <span className="text-red-500 font-bold normal-case">↓ 2%</span>
           </h3>
           <p className="text-3xl font-bold text-[var(--color-brand-navy)]">₦ 17,250</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          <OrderStatusChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
            </div>
            <table className="w-full text-sm text-left">
               <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                  <tr>
                     <th className="px-6 py-3 font-medium tracking-wider">Order ID</th>
                     <th className="px-6 py-3 font-medium tracking-wider">Customer</th>
                     <th className="px-6 py-3 font-medium tracking-wider">Status</th>
                     <th className="px-6 py-3 font-medium tracking-wider">Total</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-200">
                  <tr>
                     <td className="px-6 py-4 whitespace-nowrap">ORD-123456</td>
                     <td className="px-6 py-4 whitespace-nowrap">Jane Doe</td>
                     <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span></td>
                     <td className="px-6 py-4 whitespace-nowrap">₦ 45,000</td>
                  </tr>
                  <tr>
                     <td className="px-6 py-4 whitespace-nowrap">ORD-123455</td>
                     <td className="px-6 py-4 whitespace-nowrap">John Smith</td>
                     <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Delivered</span></td>
                     <td className="px-6 py-4 whitespace-nowrap">₦ 125,000</td>
                  </tr>
               </tbody>
            </table>
          </div>
        </div>
        <div className="lg:col-span-1">
          <TopProducts />
        </div>
        <div className="lg:col-span-1">
          <LowStockAlerts />
        </div>
      </div>
    </div>
  );
}
