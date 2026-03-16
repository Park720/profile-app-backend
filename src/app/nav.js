import Link from 'next/link';
import styles from './nav.module.css';

const Nav = () => {
    return (
        <header className={styles.navbar}>
            <nav>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/add-profile">Add Profile</Link>
                <Link href="/fetched-profile">Fetched Profile</Link>
            </nav>
        </header>
    );
}

export default Nav;