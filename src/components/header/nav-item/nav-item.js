import './nav-item.css';
import chevronDown from '../../../assets/icons/chevron-down.svg';

export default function NavItem({title}) {
  return (
        <div className="NavItem">
            <p>{title}</p>
            <img src={chevronDown} className="AppLogo" alt="logo" />
        </div>
  );
}