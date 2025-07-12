import Navigation from "./Navigation"
import './About.css'
function About() {
    return(
        <div>
            <div className="nav-about">
                <Navigation/>
            </div>
                <h1>About me</h1>
            <div className="about">
                 <p className="description">This Todo App is a clean, user-friendly task management web application developed by Vimukthi Kolitha, a Year 3 Semester 2 student at SLIIT, as part of practical learning in React, Node.js, and MongoDB. The app allows users to add, display, delete, and reorder daily tasks efficiently, providing a scrollable task list while keeping the input field and navigation fixed for easy accessibility. Tasks are stored in a MongoDB database via an Express backend, ensuring persistence across sessions, and users can organize their workflow effectively by moving tasks up and down according to priority. The interface is styled with clear, visually distinct action buttons for intuitive task management, and the layout uses responsive flexbox design to maintain alignment and consistency regardless of the length of tasks entered. This project demonstrates Vimukthi’s ability to build functional, interactive full-stack applications with clean structure, state management using React hooks, and seamless API integration, reflecting his ongoing commitment to strengthening practical software engineering skills.</p>         
            </div>
              
        </div>
    )
}
export default About