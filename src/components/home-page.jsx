import {useLocation} from "react-router-dom";

export const HomePage = () => {
    const location = useLocation()
 return (
     <div>
         <h1>This is the Home Page</h1>
     </div>
 )
}