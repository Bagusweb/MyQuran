import {getCurrentData} from './localStorage';

export const getLastListenedOfNumberOfSurah = (numberOfSurah) => {
    return getCurrentData('_last_listened').find(l => l.numberOfSurah == numberOfSurah)?.last_listened_date;
}