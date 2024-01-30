import styles from "./Footer.module.css"

function Footer() {
    return (  
        <footer className={styles.footer}>
            <p><span className="bold">Car Rent</span> &copy; 2024</p>
        </footer>
    );
}

export default Footer;
