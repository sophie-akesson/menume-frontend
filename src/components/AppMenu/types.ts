export interface AppMenuProps {
  isLoggedIn?: boolean;
}

export interface MenuElementProps {
  isLoggedIn: boolean;
  showMenu(): void;
  className: string;
}
