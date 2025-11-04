import React, { useEffect } from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
import { getDisplayName } from '../../assets/categoryMap'

const ExploreMenu = ({ category, setCategory }) => {
    useEffect(() => {
        const scrollContainer = document.querySelector('.explore-menu-list');
        const leftBtn = document.querySelector('.scroll-btn.left');
        const rightBtn = document.querySelector('.scroll-btn.right');

        leftBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: -200, behavior: 'smooth' });
        });

        rightBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
        });
    }, []);

    return (
        <div className="explore-menu" id="explore-menu">
            <h1>Khám phá menu của chúng tôi</h1>
            <p className="explore-menu-text">
                Tại Pizzaholic, chúng tôi tin rằng mỗi lát pizza là một khoảnh khắc hạnh phúc.
                Với công thức độc quyền kết hợp giữa lớp đế giòn tan, phô mai béo ngậy và
                nguồn nguyên liệu tươi ngon được chọn lọc kỹ lưỡng mỗi ngày, Pizzaholic
                mang đến hương vị đậm đà, chuẩn vị Ý nhưng vẫn gần gũi với khẩu vị người Việt.
            </p>

            <div className="explore-menu-wrapper">
                <button className="scroll-btn left">&#10094;</button>

                <div className="explore-menu-list">
                    {menu_list.map((item, index) => (
                        <div
                            onClick={() =>
                                setCategory(prev =>
                                    prev === item.menu_name ? "All" : item.menu_name
                                )
                            }
                            key={index}
                            className="explore-menu-list-item"
                        >
                            <img src={item.menu_image} alt={item.menu_name} />
                            <p className={category === item.menu_name ? "active" : ""}>
                                {getDisplayName(item.menu_name)}
                            </p>
                        </div>
                    ))}
                </div>

                <button className="scroll-btn right">&#10095;</button>
            </div>
        </div>
    );
};

export default ExploreMenu;
