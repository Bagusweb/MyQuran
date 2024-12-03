import { Disclosure } from '@headlessui/react'
import Container from "./Container"
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router';


export default function Navbar() {
    const navigation = [
        { name: 'Home', href: '/', type: "link", },
        { name: 'Favorites', href: '/surah/favorites', type: "link" },
        { name: 'Support', href: '/support', type: "button" }
    ];


    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <Disclosure as="nav" className="py-6 px-5 bg-white shadow-lg shadow-slate-100">
            {({ open }) => (
                <>
                    <Container withPadding={false}>
                        <div className="relative flex items-center justify-between">
                            <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white hide-tap-color">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-between sm:items-stretch">
                                <div className="flex-shrink-0 flex items-center">
                                    <Link to="/" className="text-xl hide-tap-color text-black font-bold">
                                        My
                                        <span className="text-green-500">Quran</span>
                                    </Link>
                                </div>
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    item.type === "button" ? 'bg-green-500 text-white hover:text-white' : 'text-gray-800 hover:text-green-500',
                                                    'px-3 py-2 rounded-md text-base font-medium hide-tap-color'
                                                )}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-5 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Disclosure.Button as={Link} key={item.name}
                                    to={item.href}
                                    className={classNames(
                                        item.type === "button" ? 'bg-green-500 text-white hover:text-white text-center ' : 'hover:bg-green-100 hover:text-green-500',
                                        'block px-3 py-2 rounded-md text-base font-medium hide-tap-color'
                                    )}>
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )
            }
        </Disclosure >
    )
}