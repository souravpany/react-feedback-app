import { useState } from "react";
import FeedbackList from "./components/FeedbackList";
import Header from "./components/Header";
import FeedbackData from "./data/FeedbackData";

function App() {

  const [feedback] = useState(FeedbackData);

  return (
    <>
      <Header />
      <FeedbackList feedback={feedback} />
    </>
  );
}

export default App;
