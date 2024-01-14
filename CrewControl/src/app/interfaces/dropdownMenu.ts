export interface IDropDownMenuItem {
    title: string;
    link?: string;
    submenuVisible?: boolean;
    submenu?: IDropDownMenuItem[];
    divider?: boolean; // Add the 'divider' property with the appropriate type
    toggleSubmenu?: () => void;
    closeSubmenu?: () => void;
    openSubmenu?: () => void;
    closeAllSubmenus?: () => void;
}