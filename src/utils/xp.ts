export const ALL_TITLES = [
  { id: "Tập sự", levelReq: 1, desc: "Danh hiệu khởi đầu khi bạn vừa chập chững bước vào con đường học thuật." },
  { id: "Học giả", levelReq: 3, desc: "Đạt cấp 3. Bạn đã lóng ngóng quen với sách vở và con chữ." },
  { id: "Tinh anh", levelReq: 6, desc: "Đạt cấp 6. Tinh hoa hội tụ, năng lực học tập của bạn bắt đầu được bộc lộ." },
  { id: "Đại sư", levelReq: 10, desc: "Đạt cấp 10. Bạn đã là một bậc thầy nhí nhảnh trong học phái của mình." },
  { id: "Quang vinh", levelReq: 15, desc: "Đạt cấp 15. Ánh hào quang rực rỡ tỏa ra từ trí tuệ của bạn." },
  { id: "Thần thoại", levelReq: 20, desc: "Đạt cấp 20. Khả năng học tập phi thường khiến người khác phải trầm trồ như một huyền thoại sống." },
  { id: "Chân lý", levelReq: 30, desc: "Đạt cấp 30. Nắm giữ kiến thức cốt lõi, thấu hiểu mọi nguyên lý." },
  { id: "Quân Vương Triết Học", isCustom: true, desc: "Danh hiệu bí ẩn, siêu hiếm. Đổi thưởng từ Chợ Vật Phẩm với mức giá đắt đỏ. Hiệu ứng: 7 màu luân hồi." },
  { id: "Bất Bại Kiếm Thần", isCustom: true, desc: "Danh hiệu truyền thuyết, độc nhất vô nhị. Đổi thưởng tại Chợ Huyền Cảnh. Hiệu ứng: Ngọc lục bảo độc tôn." },
];

export const getUnlockedTitles = (level: number, currentTitle?: string) => {
  const titles = ALL_TITLES.filter(t => !t.isCustom && level >= t.levelReq).map(t => t.id);
  if (currentTitle && ALL_TITLES.find(t => t.isCustom && t.id === currentTitle)) {
    if (!titles.includes(currentTitle)) titles.push(currentTitle);
  }
  return titles;
};

export const getLevelInfo = (xp: number) => {
  const currentLevel = Math.max(1, Math.floor(Math.sqrt(Math.max(0, xp) / 50)) + 1);
  const currentLevelXp = Math.pow(currentLevel - 1, 2) * 50;
  const nextLevelXp = Math.pow(currentLevel, 2) * 50;
  
  const xpIntoCurrentLevel = xp - currentLevelXp;
  const xpNeededForNextLevel = nextLevelXp - currentLevelXp;
  const progressPercentage = Math.min(100, Math.max(0, (xpIntoCurrentLevel / xpNeededForNextLevel) * 100));

  let title = "Tập sự";
  if (currentLevel >= 3) title = "Học giả";
  if (currentLevel >= 6) title = "Tinh anh";
  if (currentLevel >= 10) title = "Đại sư";
  if (currentLevel >= 15) title = "Quang vinh";
  if (currentLevel >= 20) title = "Thần thoại";
  if (currentLevel >= 30) title = "Chân lý";

  let titleColor = "text-stone-500 font-medium";
  let badgeColors = "from-stone-400 to-stone-500 text-stone-900";
  
  if (currentLevel >= 3) {
    titleColor = "text-blue-500 font-semibold";
    badgeColors = "from-blue-400 to-blue-500 text-white shadow-blue-500/20";
  }
  if (currentLevel >= 6) {
    titleColor = "text-purple-500 font-semibold";
    badgeColors = "from-purple-400 to-purple-600 text-white shadow-purple-500/30";
  }
  if (currentLevel >= 10) {
    titleColor = "text-amber-500 font-bold";
    badgeColors = "from-amber-400 to-orange-500 text-white shadow-amber-500/40";
  }
  if (currentLevel >= 15) {
    titleColor = "text-red-500 font-bold";
    badgeColors = "from-rose-500 to-red-600 text-white shadow-red-500/50";
  }
  if (currentLevel >= 20) {
    titleColor = "text-yellow-600 font-black animate-pulse";
    badgeColors = "from-yellow-300 via-amber-500 to-yellow-600 text-white shadow-yellow-500/60 ring-2 ring-yellow-400/50";
  }
  if (currentLevel >= 30) {
    titleColor = "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-fuchsia-500 to-amber-400 font-black";
    badgeColors = "from-blue-500 via-purple-500 to-amber-500 text-white shadow-fuchsia-500/60 ring-2 ring-purple-400/50";
  }

  return {
    currentLevel,
    currentLevelXp,
    nextLevelXp,
    xpIntoCurrentLevel,
    xpNeededForNextLevel,
    progressPercentage,
    title,
    titleColor,
    badgeColors
  };
};

export const getCustomTitleTextClass = (title?: string, fallbackClass?: string) => {
  if (title === "Quân Vương Triết Học") {
    // 7 colors
    return "text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 animate-rainbow-text font-black drop-shadow-sm";
  }
  if (title === "Bất Bại Kiếm Thần") {
    return "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-emerald-500 font-black drop-shadow-sm";
  }
  return title ? "text-amber-600 dark:text-amber-400 font-bold" : (fallbackClass || "");
};

export const getCustomTitleBadgeClass = (title?: string, fallbackClass?: string) => {
  if (title === "Quân Vương Triết Học") {
    return "bg-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 font-black ring-2 ring-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-rainbow-text";
  }
  if (title === "Bất Bại Kiếm Thần") {
    return "bg-emerald-950 text-emerald-400 font-black ring-2 ring-yellow-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]";
  }
  return title ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold" : (fallbackClass || "");
};
