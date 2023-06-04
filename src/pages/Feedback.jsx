import { useState } from "react";
import '../components/Feedback.css';
import { FaStar } from "react-icons/fa";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
};

const userId = sessionStorage.getItem('userId');

function Feedback() {
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [comment, setComment] = useState(""); 
    const stars = Array(5).fill(0);

    const handleClick = value => {
        setCurrentValue(value);
    };

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue);
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined);
    };

    const handleCommentChange = event => {
        setComment(event.target.value);
    };

    const handleSubmit = () => {
        const feedbackData = {
            userId: userId, 
            starRating: currentValue,
            comment: comment
        };

        fetch(`http://localhost:9191/customer/feedback/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(feedbackData)
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <div style={styles.container}>
            <h2>Leave a feedback</h2>
            <div style={styles.stars}>
                {stars.map((_, index) => (
                    <FaStar
                        key={index}
                        size={24}
                        onClick={() => handleClick(index + 1)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseLeave={handleMouseLeave}
                        color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                        style={{
                            marginRight: 10,
                            cursor: "pointer"
                        }}
                    />
                ))}
            </div>
            <textarea
                placeholder="What's your experience?"
                style={styles.textarea}
                value={comment}
                onChange={handleCommentChange}
            />
            <button style={styles.button} onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    stars: {
        display: "flex",
        flexDirection: "row",
    },
    textarea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        padding: 10,
        margin: "20px 0",
        minHeight: 100,
        width: 300
    },
    button: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: 300,
        padding: 10,
        cursor: "pointer"
    }
};

export default Feedback;
