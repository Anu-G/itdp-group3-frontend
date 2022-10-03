export const navItemsTimeline = [
  {
    id: 1,
    title: "Recommendation",
    path: "/feeds/",
    nName: "nav-item",
    sName: "sidebar-item"
  },
  {
    id: 2,
    title: "Explore",
    path: "/feeds/search",
    nName: "nav-item",
    sName: "sidebar-item"
  }
];

export const navItemsTimelineAnon = [
  {
    id: 1,
    title: "Recommendation",
    path: "/feeds/",
    nName: "nav-item",
    sName: "sidebar-item"
  },
  {
    id: 2,
    title: "Explore",
    path: "/feeds/search",
    nName: "nav-item",
    sName: "sidebar-item"
  },
  {
    id: 3,
    title: "What is TokTok?",
    path: "/feeds/support",
    nName: "nav-item",
    sName: "sidebar-item"
  }
];

export const navItemsNonBusinessProfile = [
  {
    id: 1,
    title: "Profile",
    path: "./settings/profile",
    nName: "nav-item",
    sName: "sidebar-item",
  },
  {
    id: 2,
    title: "Account",
    path: "./settings/account",
    nName: "nav-item",
    sName: "sidebar-item",
  },
  {
    id: 3,
    title: "Support",
    path: "./support",
    nName: "nav-item",
    sName: "sidebar-item",
  }
];

export const navItemsBusinessProfile = [
  {
    id: 1,
    title: "Profile",
    path: "./settings/profile",
    nName: "nav-item",
    sName: "sidebar-item",
  },
  {
    id: 2,
    title: "Account",
    path: "./settings/account",
    nName: "nav-item",
    sName: "sidebar-item",
  },
  {
    id: 3,
    title: "Manage Catalog",
    path: "./settings/catalog",
    nName: "nav-item",
    sName: "sidebar-item",
  },
  {
    id: 4,
    title: "FAQ",
    path: "./settings/faq",
    nName: "nav-item",
    sName: "sidebar-item",
  },
  {
    id: 5,
    title: "Support",
    path: "./support",
    nName: "nav-item",
    sName: "sidebar-item",
  }
];

export const buttonNavNonBusiness = (activateBusiness, onLogout, isLoadActivate, isLoadLogout) => ([
  {
    id: 'applyBusiness',
    className: 'sidebar-btn',
    label: 'To Business Account',
    onClick: activateBusiness,
    isLoading: isLoadActivate
  }, {
    id: 'logout',
    className: 'sidebar-btn',
    label: 'Logout',
    onClick: onLogout,
    isLoading: isLoadLogout
  }
]);

export const buttonNavBusiness = (onLogout, isLoadLogout) => ([
  {
    id: 'logout',
    className: 'sidebar-btn',
    label: 'Logout',
    onClick: onLogout,
    isLoading: isLoadLogout
  }
]);