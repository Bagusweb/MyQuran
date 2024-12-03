import Ayah from './Ayah';
import Heading from './Heading';
import { Fragment } from 'react';
import { ChevronDownIcon, PlayIcon, RefreshIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/outline';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../helpers/axios';
import Spinner from './Spinner';
import { Menu, Transition } from '@headlessui/react';
import { getLastListenedOfNumberOfSurah } from '../helpers/date';
import Input from './Input';
import { getCurrentData, saveData } from '../helpers/localStorage';
import BackToTop from './BackToTop';

const countries = {
    id: "Indonesia",
    ar: "Saudi Arabia",
    az: "Azerbaijan",
    bn: "Bangladesh",
    cs: "Czech Republic",
    de: "",
    dv: "Maldives",
    en: "English",
    es: "Mexico",
    fa: "Afghanistan",
    fr: "France",
    ha: "",
    hi: "India",
    it: "Italy",
    ja: "Japan",
    ko: "South Korea",
    ku: "Iraq",
    ml: "Mali",
    nl: "The Netherlands",
    no: "Norway",
    pl: "Poland",
    pt: "São Tomé and Príncipe",
    ro: "Romania",
    ru: "Russia",
    sd: "Sudan",
    so: "Somalia",
    sq: "Albania",
    sv: "Sweden",
    sw: "",
    ta: "Sri Lanka",
    tg: "Tajikistan",
    th: "Thailand",
    tr: "Turkey",
    tt: "Trinidad and Tobago",
    ug: "",
    ur: "Pakistan",
    uz: "Uzbekistan",
    zh: "China",
}

export default function SurahDetail() {
    const tr = getCurrentData('_translation', "{}");

    const [surah, setSurah] = useState([]);
    const [loading, setLoading] = useState(true);
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(0);
    const [ayahs, setAyahs] = useState([]);
    const [translations, setTranslations] = useState([]) // TODO: get from localStorage
    const [translation, setTranslation] = useState(tr?.translation || 'id.indonesian'); // TODO: get from localStorage

    const [lockView, setLockView] = useState(getCurrentData("_lock_view", "{}").lockView);

    const params = useParams();
    const navigate = useNavigate();

    const getSurahAndTranslations = async (numberOfSurah) => {
        try {
            const { data } = await axios.get(`surah/${numberOfSurah}/ar.alafasy`);
            const { data: dataInTR } = await axios.get(`surah/${numberOfSurah}/en.transliteration`);
            const { data: dataInTRL } = await axios.get(`surah/${numberOfSurah}/${translation}`);
            const { data: translations } = await axios.get(`edition/type/translation`);

            const mappedSurah = data.data.ayahs.map(ayah => {
                ayah.textInTR = dataInTR.data.ayahs[ayah.numberInSurah - 1].text;
                ayah.textInTRL = dataInTRL.data.ayahs[ayah.numberInSurah - 1].text;
                return ayah;
            });
            data.data.ayahs = mappedSurah;

            setSurah(data.data);
            setMax(data.data.numberOfAyahs);
            setTranslations(translations.data);
            setLoading(false);
        } catch (e) { // if number of surah is not valid
            setTranslation("id.indonesian") // if translation in localStorage is changed but wrong
            navigate('/');
        }
    }

    const getAyahs = () => {
        setAyahs(surah?.ayahs?.filter(ayah => Number(ayah.numberInSurah) >= min && Number(ayah.numberInSurah) <= max));
    }

    const changeTranslation = async (numberOfSurah) => {
        const { data: dataInTRL } = await axios.get(`surah/${numberOfSurah}/${translation}`);

        const ayahs = surah?.ayahs?.map(ayah => {
            ayah.textInTRL = dataInTRL?.data?.ayahs[ayah.numberInSurah - 1]?.text;
            return ayah;
        });

        setAyahs(ayahs);
    }

    const updateLockView = () => {
        const lv = getCurrentData('_lock_view', '{}');
        lv.lockView = lockView;
        saveData('_lock_view', lv);
    }

    useEffect(() => {
        getSurahAndTranslations(params.number);
    }, [params.number]);

    useEffect(() => {
        updateLockView();
    }, [lockView]);

    useEffect(() => {
        getAyahs();
    }, [min, max]);

    useEffect(() => {
        changeTranslation(params.number);
    }, [translation]);

    if (loading)
        return (<Spinner />)

    return (
        <>
            <BackToTop />
            <div className="flex items-stretch md:items-center justify-between mb-3 md:mb-5 flex-col md:flex-row pt-5">
                <Heading className="text-xl sm:text-3xl font-bold mb-5 md:mb-0 text-center flex items-center gap-5">
                    Surah {surah.englishName}
                    <button className="rounded-full text-green-500 h-9 w-9" onClick={() => {
                        document.querySelectorAll('.murottals-audio').forEach((el, i) => {
                            el.pause();
                            if (i == 0) {
                                el.play()
                            }
                        });
                    }}>
                        <PlayIcon />
                    </button>
                    <button className="rounded-full h-9 w-9 text-green-500" title="Toogle lock 
                    view while playing audio." onClick={() => {
                            setLockView(!lockView);
                        }} >
                        {lockView ? (
                            <LockClosedIcon />
                        ) : (
                            <LockOpenIcon />
                        )}
                    </button>
                </Heading>

                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded">
                            Translation : {countries[translation.split('.')[0]]} ~ {translations?.find(tr => tr.identifier == translation).englishName}
                            <ChevronDownIcon
                                className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                                aria-hidden="true"
                            />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1 max-h-96 overflow-y-auto">
                                {translations?.map((translation, i) => {
                                    return (
                                        <Menu.Item key={i}>
                                            <button
                                                className='bg-white text-gray-900 group flex hover:bg-gray-50 items-center w-full px-2 py-2 text-sm text-left'
                                                onClick={(e) => {
                                                    setTranslation(e.target.dataset.identifier);
                                                    let tr = getCurrentData('_translation', "{}");
                                                    tr.translation = e.target.dataset.identifier;
                                                    saveData('_translation', tr);
                                                }} data-identifier={translation.identifier}>
                                                {countries[translation.language] || 'Unknown'} ~ {translation.englishName}
                                            </button>
                                        </Menu.Item>
                                    );
                                })}
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>

            <div className="p-5 bg-white rounded grid grid-cols-1 sm:grid-cols-3 gap-2 font-bold text-base mb-4">
                <span>Surah to : <span className="text-green-500 block">{surah.number}</span></span>
                <span>English Name Translation : <span className="text-green-500 block">{surah.englishName}</span></span>
                <span>Arabic Name : <span className="text-green-500 block">{surah.name}</span></span>
            </div>
            <div className="p-5 bg-white rounded grid grid-cols-1 sm:grid-cols-3 gap-2 font-bold text-base mb-4">
                <span>Total Ayahs : <span className="text-green-500 block">{surah.numberOfAyahs}</span></span>
                <span>Revelation Type : <span className="text-green-500 block">{surah.revelationType}</span></span>
                <span>Last Listened : <span className="text-green-500 block">{getLastListenedOfNumberOfSurah(params.number) || "-"}</span></span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 font-bold text-base mb-4 items-center">
                <Input type="number" labelText="Start From" min={1} max={surah.numberOfAyahs - 1} value={min} className="w-full" onChange={(e) => setMin(Number(e.target.value))} />
                <Input type="number" labelText="End" min={min + 1} max={surah.numberOfAyahs} value={max} className="w-full" onChange={(e) => setMax(Number(e.target.value))} />
                <button className="h-9 w-9 text-green-500 mt-5 ml-2" onClick={() => {
                    setMin(1);
                    setMax(Number(surah?.numberOfAyahs));
                }} title="Reset to default start and end of Ayah.">
                    <RefreshIcon />
                </button>
            </div>

            <div className="space-y-5">
                {ayahs?.map((ayah, i) => {
                    return (
                        <Ayah key={i} lockView={lockView} ayah={ayah} numberOfSurah={params.number} />
                    )
                })}
            </div>
        </>
    );
}