import PropTypes from 'prop-types'

function FeedbackStats({feedback}) {

    // calculate rating average
    let average = feedback.reduce((acc, cur) => {
            return acc + cur.rating
    }, 0) / feedback.length
 
    average = average.toFixed(1).replace(/[.,]0$/,''); // converting avg to 9, 8.5, 8 etc..


  return (
    <div className='feedback-stats'>
        <h4>{feedback.length} Reviews</h4>
        <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  )
}

PropTypes.FeedbackStats = {
    feedback: PropTypes.array.isRequired
}

export default FeedbackStats