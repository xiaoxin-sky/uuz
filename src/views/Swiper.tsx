import React, {useState, useEffect, useRef} from 'react';

import SwiperMaster from '../controller/swiper';
import { getClassName, getValOrDefault } from '../utils/base';

interface SwiperProps {
    children: React.ReactNodeArray,
    width: string,
    height: string,
    direction: 'x' | 'y',
    className: string
}

export default function Swiper ({
        children, width, height,
        direction = 'x', className
    }: SwiperProps) {
    const [curSwiperIdx, setCurTabIdx] = useState(0);
    const [swiperMaster, setSwiperMaster] = useState();
    const [swiperPoint, setSwiperPoint] = useState({ x: 0, y: 0});
    const [tansitionStyle, setTansitionStyle] = useState('');

    const refSwiper = useRef(null);

    useEffect(() => {
        const instance = new SwiperMaster({
            curIdx: 0,
            direction,
            len: children.length
        });

        const refItem = refSwiper.current as any;
        if (direction === 'x') {
            instance.setSwiperRange(refItem.offsetWidth);
        } else {
            instance.setSwiperRange(refItem.offsetHeight);
        }

        setSwiperMaster(instance);
    }, [])

    const swiperClassNames = {
        [className]: !!className,
        [`zui-swiper-${direction}`]: true
    }

    const swiperStyle: React.CSSProperties = {
        width: getValOrDefault(width, ''),
        height: getValOrDefault(height, '')
    }

    const touchStartHandler = (event: React.TouchEvent<HTMLDivElement>) => {
        swiperMaster.start(event);
        setTansitionStyle('');
    }

    const touchMoveHandler = (event: React.TouchEvent<HTMLDivElement>) => {
        const point = swiperMaster.move(event);
        setSwiperPoint(point);
    }

    const touchEndHander = (event: React.TouchEvent<HTMLDivElement>) => {
        const point = swiperMaster.end(event);
        setCurTabIdx(swiperMaster.getIndex());
        setSwiperPoint(point);
        setTansitionStyle('all 0.3s');
    }

    return <div className={'zui-swiper'.concat(getClassName(swiperClassNames))}
        ref={refSwiper}
        onTouchStart={touchStartHandler}
        onTouchMove={touchMoveHandler}
        onTouchEnd={touchEndHander}
        style={swiperStyle}>
        <div className="zui-swiper-body" style={{
            transform: `translate(${swiperPoint.x}px, ${swiperPoint.y}px)`,
            transition: tansitionStyle
        }}>
            { children }
        </div>
        <SwiperNav
            len={children.length}
            curActiveIdx={curSwiperIdx}
        ></SwiperNav>
    </div>
}

interface SwiperItemProps {
    children: React.ReactNode
}

export function SwiperItem ({children}: SwiperItemProps): JSX.Element {
    return <div className="zui-swiper-item">{children}</div>
};

interface SwiperNavProps {
    len: number,
    curActiveIdx: number
}

function SwiperNav({len, curActiveIdx}: SwiperNavProps): JSX.Element {

    return <div className="zui-swiper-nav-box">
        {
            Array(len).fill('').map((val, idx) => 
            <span
                key={idx}
                className={'zui-swiper-nav'.concat(curActiveIdx === idx ? ' active' : '')}
            ></span>)
        }
    </div>
}
