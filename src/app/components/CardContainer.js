import styles from './CardContainer.module.css';

const CardContainer = ({ children, title }) => {
    return (
        <div className={styles.cardContainerWrapper}>
            {title && <h2>{title}</h2>}
            <div className={styles.cardGridLayout}>
                {children}
            </div>
        </div>
    );
};

export default CardContainer;