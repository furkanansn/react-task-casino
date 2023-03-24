import MenuItems from "./MenuItems";
import classes from './NavBar.module.css'
import './Dropdown.css'

const Dropdown = ({ submenus, dropdown }) => {
  return (
    <ul className={`dropdown ${dropdown ? "show" : ""}`}>
      {submenus.map((submenu, index) => (
        <MenuItems items={submenu} key={index} />
      ))}
    </ul>
  );
};

export default Dropdown;
