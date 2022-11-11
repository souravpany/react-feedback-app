import { createContext, useState, useEffect } from 'react'

//Below import can be used when will be generating random id manually
//import { v4 as uuidv4 } from 'uuid';


const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([]);
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    // calling Fetch feedback API
    useEffect(() => {
        fetchFeedback()
    }, [])

    // Fetch feedback
    const fetchFeedback = async () => {
        const response = await fetch(`/feedback?_sort=id&_order=desc`)
        const data = await response.json()

        setFeedback(data)
        setIsLoading(false)
    }

    // // Delete feedback without back end
    // const deleteFeedback = (id) => {
    //     if (window.confirm('Are you sure you want to delete ?')) {
    //         setFeedback(feedback.filter((item) => item.id !== id))
    //     }
    // }

    // Delete feedback
    const deleteFeedback = async (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            await fetch(`/feedback/${id}`, {
                method: 'DELETE'
            })

            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    //Add feed back without back end
    // const addFeedback = (newFeedback) => {
    //     newFeedback.id = uuidv4();
    //     setFeedback([newFeedback, ...feedback])
    // }


    // Add feedback
    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFeedback),
        })

        const data = await response.json()

        setFeedback([data, ...feedback])
    }

    //Update feedback without back end
    // const updateFeedback = (id, updItem) => {
    //     setFeedback(
    //         feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    //     )
    // }


    // Update feedback item 
    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updItem),
        })

        const data = await response.json()

        // NOTE: no need to spread data and item
        setFeedback(feedback.map((item) => (item.id === id ? data : item)))

        // this part allow to add a feedback after editing
        setFeedbackEdit({
            item: {},
            edit: false,
        })
    }

    //set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }


    return (
        <FeedbackContext.Provider value={{
            feedback,
            deleteFeedback,
            addFeedback,
            editFeedback,
            feedbackEdit,
            updateFeedback,
            isLoading,
        }}>
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext