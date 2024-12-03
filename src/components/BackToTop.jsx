import { Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/outline';
import { useEffect, useRef } from 'react';

export default function BackToTop({ id }) {
    const backToTop = useRef();

    const scrollEvent = () => {
        if (window.scrollY <= 0) {
            backToTop?.current?.classList?.add('hidden');
        } else {
            backToTop?.current?.classList?.remove('hidden');
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollEvent);
        return () => window.removeEventListener("scroll", scrollEvent);
    }, [])

    return (
        <div onClick={() => {
            let element = null;
            if (id) {
                element = document.getElementById(id);
            }

            scrollTo({
                behavior: "smooth",
                top: element ? element.offsetTop : 0
            });
        }} ref={backToTop} className={`bg-green-500 h-12 hover:shadow-lg transition hover:shadow-green-200 cursor-pointer grid place-content-center w-12 text-white rounded-full fixed bottom-10 right-10 z-50${window.scrollY <= 0 ? ' hidden' : ''}`}>
            <ChevronUpIcon className="h-7 w-7" />
        </div>
    )
}