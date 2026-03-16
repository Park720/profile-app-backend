import styles from './Card.module.css';

const Card = ({ name, year, major, email, image }) => {
    return (
        <div className={styles.profileCard}>
            {image && <img src={image} alt={name} width={100} height={100} />}
            <p>{name}</p>
            <p>{year}</p>
            <p>{major}</p>
            <p>{email}</p>
        </div>
    );
};

export default Card;