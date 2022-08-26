import { faPlusCircle, faQuestionCircle, faTableCells, faUserCircle, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';

export const navItemsSettings = [
  {
    id: 1,
    title: "Settings",
    path: "./",
    nName: "nav-item",
    sName: "sidebar-item",
  },
  {
    id: 2,
    title: "Profile",
    path: "./profile",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <FontAwesomeIcon icon={faUserCircle} />,
  },
  {
    id: 3,
    title: "Account",
    path: "./account",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <FontAwesomeIcon icon={faUserEdit} />,
  },
  {
    id: 4,
    title: "Catalog",
    path: "./catalog",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <FontAwesomeIcon icon={faTableCells} />,
  },
  {
    id: 5,
    title: "Post",
    path: "./post",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <FontAwesomeIcon icon={faPlusCircle} />,
  },
  {
    id: 6,
    title: "FAQ",
    path: "./faq",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <FontAwesomeIcon icon={faQuestionCircle} />,
  },
];