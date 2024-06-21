import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { DURATION_ICONS, ACCIDENTAL_ICONS, REST_ICONS, NOTE_ICONS } from '@/utils/constants';

interface MusicIconProps {
    class: string;          // one of "note", "duration", "accidental", "rest"
    value: string;
}

const MusicIcon: React.FC<MusicIconProps> = ({ class: type , value }) => {
    const [iconPath, setIconPath] = useState<string>('');

    useEffect(() => {
        if (!value) return;
        value = value.toLowerCase();

        let iconList = getIconList();
        let reducedList = reduceList(iconList);
        let idx = reducedList.indexOf(value);
        
        setIconPath(iconList[idx]);
    }, [value]);

    const getIconList = () => {
        // get relevant list of icon paths for particular type
        switch (type) {
            case "note":
                return NOTE_ICONS;
            case "duration":
                return DURATION_ICONS;
            case "accidental":
                return ACCIDENTAL_ICONS;
            case "rest":
                return REST_ICONS;
            default:
                return [];
        }
    };

    const reduceList = (list: string[]) => {
        // isolate filename from each element of list of paths
        let reducedList = list.map((item) => item.split("/")[3].split(".")[0]);
        return reducedList;
    };

    return (
        <div className="flex flex-col bg-gray-200 mx-4 mb-4 justify-start items-center h-24 w-24 space-y-1 py-0">
            <p className="text-center text-lg text-gray-700 mx-2 border-b border-gray-900">{type}</p>
            
            {value &&
                <Image src={iconPath} alt={value} width={64} height={64} />
            }
        </div>
    );
};

export default MusicIcon;