import { Icon } from '@iconify/react';
import './MiniDashboard.css';

// 1. Array of 4 stat items using Iconify icon names
const dashboardData = [
  {
    id: 1,
    title: 'Total Skincare',
    count: 23,
    growth: '+ 10 This Week',
    icon: 'ph:spray-bottle-fill', // Solid spray bottle
  },
  {
    id: 2,
    title: 'Total Products',
    count: 145,
    growth: '+ 18 This Week',
    icon: 'solar:box-bold', // Solid box
  },
  {
    id: 3,
    title: 'Total Orders',
    count: 89,
    growth: '+ 12 This Week',
    icon: 'ph:shopping-bag-open-fill', // Solid shopping bag
  },
  {
    id: 4,
    title: 'Total Customers',
    count: 312,
    growth: '+ 25 This Week',
    icon: 'solar:users-group-two-rounded-bold', // Solid users group
  },
];

export default function MiniDashboard() {
  return (
    <div className="dashboard-grid">
      {dashboardData.map((item) => (
        <div key={item.id} className="stat-card">
          <div className="card-header">
            <span className="card-title">{item.title}</span>
            <div className="icon-wrapper">
              <Icon icon={item.icon} width="22" height="22" />
            </div>
          </div>

          <div className="card-count">{item.count}</div>

          <div className="card-footer">
            <span className="badge">
              <Icon icon="lucide:trending-up" width="14" height="14" />
            </span>
            <span className="growth-text">{item.growth}</span>
          </div>
        </div>
      ))}
    </div>
  );
}