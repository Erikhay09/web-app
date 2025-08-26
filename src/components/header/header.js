import './header.css';
import NavItem from './nav-item/nav-item';

export default function Header() {
  return (
    <header className="AppHeader">
        <img src="/logo.svg" className="AppLogo" alt="logo" />
        <NavItem title="Getting started"/>
        <NavItem title="Components"/>
        <NavItem title="Documentation"/>
    </header>
  );
}