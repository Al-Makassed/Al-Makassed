import ListItem from "@mui/material/ListItem";
import { FC, MouseEvent, ReactNode } from "react";
import { Link } from "react-router-dom";

export interface ItemWrapperProps {
  className?: string;
  link?: string;
  toggleList?: (event: MouseEvent<HTMLElement>) => void;
  children?: ReactNode;
}

const MenuItemWrapper: FC<ItemWrapperProps> = (props) => {
  const { className, toggleList, link, children } = props;

  // If link is not set, return the ordinary ListItem
  if (!link) {
    return (
      <ListItem disablePadding className={className} onClick={toggleList}>
        {children}
      </ListItem>
    );
  }

  // Return a ListItem with a hyperlink component
  return (
    <ListItem disablePadding component={Link} to={link} className={className}>
      {children}
    </ListItem>
  );
};

export default MenuItemWrapper;
