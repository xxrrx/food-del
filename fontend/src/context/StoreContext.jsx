import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:8080"
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])
    const [searchItems, setSearchItems] = useState("");
    const [ratings, setRatings] = useState({});

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    }
    const removeAll = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - prev[itemId] }))
        if (token) {
            await axios.post(url + "/api/cart/removeAll", { itemId }, { headers: { token } })
        }
    }

    const loadCartData = async (token) => {
        if (token) {
            // const response = await axios.get(url + "/api/cart/get", {}, { headers: { token } });
            const response = await axios.get(url + "/api/cart/get",  { headers: { token } });

            setCartItems(response.data.cartData || {});
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data)
    }

    const fetchRatings = async () => {
        const response = await axios.get(url + "/api/review/ratings");
        setRatings(response.data.data || {})
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            await fetchRatings();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, [])


    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        removeAll,
        getTotalCartAmount,
        url,
        token,
        setToken,
        searchItems,
        setSearchItems,
        ratings,
        fetchRatings
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;