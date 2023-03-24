import { menuItems } from './items';
import MenuItems from './MenuItems';

import classes from './NavBar.module.css'

const Navbar = () => {
    return (
      <nav>
        <ul className={classes.menus}>
          {menuItems.map((menu, index) => {
            return <MenuItems items={menu} key={index} />
          })}
        </ul>
      </nav>
    );
  };
  
  export default Navbar;