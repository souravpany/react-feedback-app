import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'


import { FaTimes, FaEdit } from 'react-icons/fa'
import PropTypes from 'prop-types'

import Card from './shared/Card'

function FeedbackItem({ item }) {

  const { deleteFeedback } = useContext(FeedbackContext);

  return (
    <Card reverse={false}>
        <div className="num-display">{item.rating}</div>
        <button className='close' onClick={() => deleteFeedback(item.id)}>
        <FaTimes color='purple' />
      </button>
      <button className='edit'>
        <FaEdit color='purple' />
      </button>
        <div className="text-display">{item.text}</div>
    </Card>
  )
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default FeedbackItem