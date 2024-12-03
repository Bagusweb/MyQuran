import { HeartIcon } from "@heroicons/react/solid";
import Container from "./Container";

export default function Footer() {
    return (
        <div className="text-center py-6 px-5 bg-white drop-shadow-lg  shadow-slate-100">
            <Container withPadding={false}>
                <p className="text-gray-800">Created with <HeartIcon className="inline-block h-5 w-5 text-red-500" /> by <a href="https://github.com/bagusweb" className="text-green-500 font-bold">Bagus Erlangga</a> and saved in <a href="https://github.com/bagusweb" className="text-green-500 font-bold">GitHub.</a></p>
            </Container>
        </div>
    )
}