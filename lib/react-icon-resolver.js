export const REACT_ICONS_URL = "https://react-icons.github.io/react-icons/";

export const REACT_ICON_SETS = [
 { prefix: "Vsc", package: "vsc", label: "VS Code Icons" },
 { prefix: "Fa6", package: "fa6", label: "Font Awesome 6" },
 { prefix: "Hi2", package: "hi2", label: "Heroicons 2" },
 { prefix: "Lia", package: "lia", label: "Icons8 Line Awesome" },
 { prefix: "Tfi", package: "tfi", label: "Themify Icons" },
 { prefix: "Io", package: "io5", label: "Ionicons 5", fallbacks: ["io"] },
 { prefix: "Ai", package: "ai", label: "Ant Design Icons" },
 { prefix: "Bs", package: "bs", label: "Bootstrap Icons" },
 { prefix: "Bi", package: "bi", label: "BoxIcons" },
 { prefix: "Cg", package: "cg", label: "css.gg" },
 { prefix: "Ci", package: "ci", label: "Circum Icons" },
 { prefix: "Di", package: "di", label: "Devicons" },
 { prefix: "Fa", package: "fa", label: "Font Awesome 5" },
 { prefix: "Fc", package: "fc", label: "Flat Color Icons" },
 { prefix: "Fi", package: "fi", label: "Feather" },
 { prefix: "Gi", package: "gi", label: "Game Icons" },
 { prefix: "Go", package: "go", label: "Github Octicons" },
 { prefix: "Gr", package: "gr", label: "Grommet-Icons" },
 { prefix: "Hi", package: "hi", label: "Heroicons" },
 { prefix: "Im", package: "im", label: "IcoMoon Free" },
 { prefix: "Lu", package: "lu", label: "Lucide" },
 { prefix: "Md", package: "md", label: "Material Design icons" },
 { prefix: "Pi", package: "pi", label: "Phosphor Icons" },
 { prefix: "Ri", package: "ri", label: "Remix Icon" },
 { prefix: "Rx", package: "rx", label: "Radix Icons" },
 { prefix: "Si", package: "si", label: "Simple Icons" },
 { prefix: "Sl", package: "sl", label: "Simple Line Icons" },
 { prefix: "Tb", package: "tb", label: "Tabler Icons" },
 { prefix: "Ti", package: "ti", label: "Typicons" },
 { prefix: "Wi", package: "wi", label: "Weather Icons" },
];

const PREFIX_PACKAGES = [...REACT_ICON_SETS].sort(
 (a, b) => b.prefix.length - a.prefix.length
);

export const ICON_PACKAGE_LOADERS = {
 ai: () => import("react-icons/ai"),
 bs: () => import("react-icons/bs"),
 bi: () => import("react-icons/bi"),
 cg: () => import("react-icons/cg"),
 ci: () => import("react-icons/ci"),
 di: () => import("react-icons/di"),
 fa: () => import("react-icons/fa"),
 fa6: () => import("react-icons/fa6"),
 fc: () => import("react-icons/fc"),
 fi: () => import("react-icons/fi"),
 go: () => import("react-icons/go"),
 gr: () => import("react-icons/gr"),
 gi: () => import("react-icons/gi"),
 hi: () => import("react-icons/hi"),
 hi2: () => import("react-icons/hi2"),
 im: () => import("react-icons/im"),
 io: () => import("react-icons/io"),
 io5: () => import("react-icons/io5"),
 lia: () => import("react-icons/lia"),
 lu: () => import("react-icons/lu"),
 md: () => import("react-icons/md"),
 pi: () => import("react-icons/pi"),
 ri: () => import("react-icons/ri"),
 rx: () => import("react-icons/rx"),
 si: () => import("react-icons/si"),
 sl: () => import("react-icons/sl"),
 tb: () => import("react-icons/tb"),
 tfi: () => import("react-icons/tfi"),
 ti: () => import("react-icons/ti"),
 vsc: () => import("react-icons/vsc"),
 wi: () => import("react-icons/wi"),
};

export function normalizeIconName(name) {
 if (!name || typeof name !== "string") return "";
 return name.trim();
}

export function getIconPackageCandidates(iconName) {
 const normalized = normalizeIconName(iconName);
 if (!normalized) return [];

 for (const set of PREFIX_PACKAGES) {
  if (normalized.startsWith(set.prefix)) {
   return [set.package, ...(set.fallbacks ?? [])];
  }
 }

 return [];
}

const iconModuleCache = new Map();

async function loadPackage(pkg) {
 if (!ICON_PACKAGE_LOADERS[pkg]) return null;
 if (!iconModuleCache.has(pkg)) {
  iconModuleCache.set(pkg, ICON_PACKAGE_LOADERS[pkg]());
 }
 return iconModuleCache.get(pkg);
}

export async function loadReactIconModule(iconName) {
 const normalized = normalizeIconName(iconName);
 if (!normalized) return null;

 for (const pkg of getIconPackageCandidates(normalized)) {
  const mod = await loadPackage(pkg);
  if (mod?.[normalized]) return mod[normalized];
 }

 return null;
}
