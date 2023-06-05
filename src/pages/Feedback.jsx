import { useState } from "react";
import { FaStar } from "react-icons/fa";
import '../components/Feedback.css';
import { toast } from 'react-toastify';

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
    const finishedOrder = () => 
    toast.success('✅ We Received Your Feedback', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    const handleSubmit = () => {
        const feedbackData = {
            userId: userId, 
            rating: currentValue,
            description: comment
        };
        
        fetch(`http://localhost:9191/customer/feedback/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(feedbackData)
        })
        .then(response => {
            finishedOrder();
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <div className="container">
            <h2>Provide a feedback</h2>
            <div className="stars">
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
                className="f-textarea"
                value={comment}
                onChange={handleCommentChange}
            />
            <button className="w3-button w3-black" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
}

export default Feedback;
