import { Disclosure } from "@headlessui/react";
import { HeartIcon, ChevronUpIcon } from "@heroicons/react/solid";
import Container from "./Container";
import Heading from "./Heading";

export default function Player() {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-3 sm:p-5 drop-shadow-2xl">
            <Container withPadding={false}>
                <Disclosure>
                    {({ open }) => (
                        <>
                            <div className="flex items-center gap-2 sm:gap-10 justify-between sm:justify-center">
                                <div className="flex items-center justify-between">
                                    <span className="rounded-full h-6 w-6 sm:h-10 sm:w-10 flex items-center justify-center bg-green-200 text-green-500 text-sm font-bold mr-3 sm:mr-5">1</span>
                                    <div>
                                        <Heading tag="h2" className="font-bold text-black text-sm sm:text-lg -mb-1">Al Fatihah</Heading>
                                        <small className="font-medium text-gray-500 text-xs sm:text-sm">The Opening</small>
                                    </div>
                                </div>
                                <div className="hidden sm:block">
                                    <audio controls className="sm:w-80 md:w-96" />
                                </div>
                                <div className="flex gap-3 items-center">
                                    <HeartIcon className="block h-6 w-6 text-gray-300 cursor-pointer hover:text-green-400 transition hover:scale-125" />
                                    <Disclosure.Button>
                                        <ChevronUpIcon className={`sm:hidden block h-6 w-6 text-gray-300 cursor-pointer hover:text-green-400 transition hover:scale-125 ${open ? 'rotate-180' : ''}`} />
                                    </Disclosure.Button>
                                </div>
                            </div>
                            <Disclosure.Panel className="pt-2 block sm:hidden">
                                <div>
                                    <audio controls className="w-full" />
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </Container>
        </div >
    )
}