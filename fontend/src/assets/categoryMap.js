export const categoryDisplay = {
    "rice": "GẠO",
    "drinks": "ĐỒ UỐNG",
    "pizza": "PIZZA Ý",
    "salad": "SALAD TƯƠI",
    "pasta": "MÌ Ý",
    "Drinking Food": "ĐỒ NHẬU",
    "Rice Dishes": "CƠM",
    "Beverages": "ĐỒ UỐNG",
    "Fast Food": "ĐỒ ĂN NHANH",
    "Slow Food": "ĐỒ ĂN CHẬM",
};

// Hàm tiện dụng
export const getDisplayName = (category) => {
    return categoryDisplay[category] || category; // fallback nếu không có
};

export const getCategoryValue = (displayName) => {
    return Object.keys(categoryDisplay).find(key => categoryDisplay[key] === displayName) || displayName;
};