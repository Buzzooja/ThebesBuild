'use client';

import { useRouter } from "next/navigation";

interface WTOptionProps {
    ID: string;
    workouts?: boolean;
}

const WTOption: React.FC<WTOptionProps> = ({
    ID,
    workouts
}) => {
    const router = useRouter();

    if(!workouts) {
        return (
            <div className="text-center text-white" >
                    <button className={`
                    border
                    border-teal-600
                    p-2
                    rounded-l-md
                    text-neutral-300
                    hover:text-white
                    hover:bg-teal-600
                    `}
                    onClick={() => router.push(`profile/${ID}`)}
                    >
                        Workouts
                    </button>
                    <button className={`
                    border
                    border-teal-600
                    p-2
                    text-neutral-800
                    rounded-r-md
                    bg-teal-600
                    hover:text-white
                    `}
                    >
                        Templates
                    </button>
                </div>
        )
    }

    return (
        <div className="text-center text-white" >
                <button className={`
                border
                border-teal-600
                p-2
                rounded-l-md
                bg-teal-600
                text-neutral-800
                hover:text-white
                `}
                >
                    Workouts
                </button>
                <button className={`
                border
                border-teal-600
                p-2
                rounded-r-md
                hover:bg-teal-600
                hover:text-white
                `}
                onClick={() => router.push(`templates/${ID}`)}
                >
                    Templates
                </button>
            </div>
    )
}

export default WTOption;