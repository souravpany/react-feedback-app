import {useState} from "react"
import RatingSelect from "./RatingSelect";
import Button from "./shared/Button";

import Card from "./shared/Card"

function FeedbackForm({handleAdd}) {

    const [btnDisabled, setBtnDisabled] = useState(true)
    const[text, setText] = useState();
    const [message, setMessage] = useState('')
    const [rating, setRating] = useState(10)

    const handleTextChange = (e) => {
        if (e.target.value === '') {
          setBtnDisabled(true)
          setMessage(null)
        } else if (e.target.value.trim().length < 10) { // 👈 check for less than 10
          setMessage('Text must be at least 10 characters')
          setBtnDisabled(true)
        } else {
          setMessage(null)
          setBtnDisabled(false)
        }
        setText(e.target.value)
      }

      const handleSubmit = (e) => {
        e.preventDefault()

        if (text.trim().length > 10) {

            const newFeedback = {
              text,
              rating,
            }
      
            handleAdd(newFeedback)
    
            setBtnDisabled(true) // reset disabled
            setRating(10) // set rating back to 10
            setText('')
          }

       }


  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate your service with us?</h2>
            <RatingSelect select={setRating} selected={rating}/>
            <div className="input-group">
                <input type='text' 
                placeholder="Write a review" 
                value={text} 
                onChange={handleTextChange}/>
               <Button type='submit' isDisabled={btnDisabled}>Send</Button>
            </div>
            {message && <div className='message'>{message}</div>}
        </form>
    </Card>
  )
}

export default FeedbackForm