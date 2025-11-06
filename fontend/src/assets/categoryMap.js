export const categoryDisplay = {
    "Pizza": "PIZZA",
    "Chicken": "NGHIỀN GÀ",
    "Dessert": "MÓN KHAI VỊ",
    "Drink": "ĐỒ UỐNG",
    "Rice Dishe": "CƠM NGON",
    "Fast Food": "ĐỒ ĂN NHANH",
    "Slow Food": "ĐỒ ĂN CHẬM",
    "Drinking Food": "ĐỒ  NHẬU"
};

// Hàm tiện dụng
export const getDisplayName = (category) => {
    return categoryDisplay[category] || category; // fallback nếu không có
};

export const getCategoryValue = (displayName) => {
    return Object.keys(categoryDisplay).find(key => categoryDisplay[key] === displayName) || displayName;
};