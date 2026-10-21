import "../../App.css"
import "./Review.css"
import { Icon } from "@iconify/react"

export default function Review({ rating = 0 }) {
    return (
        <div className="review-container">
            {[...Array(5)].map((_, index) => (
                <Icon key={index} icon={index < rating ? "solar:star-bold" : "solar:star-linear"} className={index < rating ? "star-filled" : "star-empty"}/>
            ))}
        </div>
    )
}