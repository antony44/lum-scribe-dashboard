
// Home/Dashboard: Navigation structure overview.
const Index = () => {
  const navSections = [
    {
      label: "Dashboard",
      description: "Personalized welcome, article quota, stats, CTA",
      path: "/",
    },
    {
      label: "Order Article",
      description: "Order new articles with options",
      path: "/order",
    },
    {
      label: "Articles / Orders",
      description: "List of all articles and orders, status, SEO score",
      path: "/articles",
    },
    {
      label: "Analytics",
      description: "Stats, best articles, activity, AI suggestions",
      path: "/analytics",
    },
    {
      label: "Invoices & Payments",
      description: "Invoice list, payment integrations",
      path: "/invoices",
    },
    {
      label: "Referral Program",
      description: "Share code, rewards, leaderboard",
      path: "/referral",
    },
    {
      label: "Profile (My Account)",
      description: "Personal/company info, security, activity",
      path: "/account",
    },
    {
      label: "Support & FAQ",
      description: "Contact, FAQ, tips",
      path: "/support",
    },
    {
      label: "Settings",
      description: "Preferences and notifications",
      path: "/settings",
    },
  ];

  return (
    <div className="container mx-auto py-10 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-primary">LÜM Dashboard Navigation Structure</h1>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {navSections.map((nav) => (
          <li key={nav.path} className="rounded-xl card-gradient border p-5 shadow hover:scale-105 duration-200 bg-white/90">
            <div className="font-bold text-lg mb-1">{nav.label}</div>
            <div className="text-muted-foreground mb-2">{nav.description}</div>
            <a href={nav.path} className="inline-block underline text-blue-500 hover:text-blue-700 text-sm">Go to page</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
