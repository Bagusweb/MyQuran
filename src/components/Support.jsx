import Heading from "./Heading";
import saweriaIcon from '../images/saweria-icon.png';

export default function Support() {
    return (
        <div className="py-5">
            <Heading className="text-3xl text-center sm:text-left font-bold mb-10">Support Me</Heading>
            <div className="flex gap-2 items-stretch flex-col w-full sm:w-auto sm:flex-row text-center">

                <a target="_blank" href="https://saweria.co/baguserlangga" className="px-8 py-10 bg-white text-green-500 grid place-content-center font-bold mb-4 border-2 hover:border-green-500 transition rounded">
                    <div className="px-5 py-4 mb-4 grid place-content-center rounded">
                        <img src={saweriaIcon} alt="" className="block w-40" />
                    </div>
                    Support with Saweria
                </a>
            </div>
        </div>
    )
}