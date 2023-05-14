import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React from "react";

interface ActiveLinkProps {
  children: ReactElement;
  href: string;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({
    children,
    href,
    shouldMatchExactHref = false
  }: ActiveLinkProps) {
    const location = useLocation();
    const isActive = shouldMatchExactHref
      ? location.pathname === href
      : location.pathname.startsWith(href);

  return (
    <NavLink to={href} style={{color: isActive ? "#66BB6A" : ""}}>
        {children}
    </NavLink>
  );
}
