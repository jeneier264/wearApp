import styles from "../style";

const UserImage = ({ image, isProfile = false }) => { 
    return (
        
            <img
                className={isProfile ? `${styles.userImage1}` : `${styles.userImage2}` }
                alt="user"
                src={`${image}`}
            />
        
    );
};

export default UserImage;