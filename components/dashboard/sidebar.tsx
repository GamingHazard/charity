'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/dashboard/programs', label: 'Programs', icon: '📚' },
  { href: '/dashboard/donations', label: 'Donations', icon: '💰' },
  { href: '/dashboard/analytics', label: 'Analytics', icon: '📈' },
  { href: '/dashboard/content', label: 'Content', icon: '📝' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-foreground">
          <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">🌱</span>
          Seeds of Love
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'text-foreground/70 hover:bg-background hover:text-foreground'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-xs text-foreground/50 text-center">
          © 2024 Seeds of Love Foundation
        </p>
      </div>
    </aside>
  );
}
