import { Link } from "react-router-dom";
import Heading from "./Heading";

export default function NotFound() {
    return (
        <div className="py-10 px-5 max-w-sm mx-auto sm:mx-0 sm:max-w-lg text-center sm:text-left">
            <small className="text-green-500 font-black text-lg sm:text-xl mb-3 block">404</small>
            <Heading tag="h1" className="text-xl sm:text-4xl font-extrabold mb-5 text-black">Whoops! This is not what you were looking for</Heading>
            <p className="text-gray-600 font-bold text-sm sm:text-lg">But you just found the sock we'd lost, thanks. Try your luck by going back to the <Link to="/" className="text-green-500">home page</Link>.</p>
        </div>
    )
}