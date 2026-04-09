"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import styles from "./nav.module.css";

export default function Nav() {
    const { data: session, status } = useSession();

    return (
        <header className={styles.navbar}>
            <nav>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/add-profile">Add Profile</Link>
                <Link href="/fetched-profile">Fetched Profile</Link>
                {status === "loading" ? (
                    <span>Loading...</span>
                ) : session ? (
                    <>
                        <span>{session.user.email}</span>
                        <button onClick={() => signOut({ callbackUrl: "/" })}>
                            Sign Out
                        </button>
                    </>
                ) : (
                    <Link href="/auth/signin">Sign In</Link>
                )}
            </nav>
        </header>
    );
}