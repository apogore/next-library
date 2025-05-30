"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/app/shared/logo/logo";
import Button from "@/app/ui/button/button";
import Search from "@/app/shared/search/search";
import NotificationPopup from "@/app/shared/notification-popup/NotificationPopup";

import "./header.scss";

const navCategories = [
  "Книги",
  "Иностранные",
  "Главное",
  "Школа",
  "Канцтовары",
  "Игрушки",
  "Еще",
  "Клуб",
  "Ростов-на-Дону — доставка",
];

const Header = () => {
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const router = useRouter();

  const catalogButtonClick = () => {
    window.location.href = window.location.href;
  };

  const toggleNotification = () => {
    setNotificationOpen(!isNotificationOpen);
  };

  const closeNotification = () => {
    setNotificationOpen(false);
  };

  const goToProfile = () => {
    router.push("/profile");
  };

  const goToCart = () => {
    router.push("/cart");
  };

  return (
    <header className="header">
      <div className="header-main">
        <div className="header-left">
          <Logo />
        </div>

        <div className="header-center">
          <Search
            className="header-search-form"
            inputType="text"
            id="searchInput"
            placeholder="Поиск по Лабиринту"
            onClick={catalogButtonClick}
            icon="/icons/find.svg"
          />
        </div>

        <div className="header-right">
          <div className="notification-wrapper" style={{ position: "relative" }}>
            <Button
              className="icon-button"
              icon="/icons/notification.svg"
              title="Уведомления"
              onClick={toggleNotification}
            />
            <NotificationPopup visible={isNotificationOpen} onClose={closeNotification} />
          </div>
          <Button
            className="icon-button"
            icon="/icons/profile.svg"
            title="Мой Лабиринт"
            onClick={goToProfile}
          />
          <Button
            className="icon-button cart-button"
            icon="/icons/cart-icon.svg"
            title="Корзина"
            onClick={goToCart}
          >
            <span className="cart-badge">0</span>
          </Button>
        </div>
      </div>

      <nav className="header-nav-categories">
        <ul>
          {navCategories.map((category) => (
            <li key={category}>
              <a href="#">{category}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
