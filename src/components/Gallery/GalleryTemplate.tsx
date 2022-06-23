import React from 'react';

import { useAppDispatch } from '../../app/hooks';

import { setActiveStatus } from '../../app/slices/gallerySlice';

// /. imports

interface propTypes {
    id: string,
    category: string,
    text: string,
    image: string,
    isActive: boolean
}

const GalleryTemplate: React.FC<propTypes> = (props) => {

    const {
        id,
        category,
        text,
        image,
        isActive
    } = props;

    const dispatch = useAppDispatch();

    const cardHandler = (): void => {
        dispatch(setActiveStatus({ id: id, status: !isActive }));
    };

    return (
        <div className={`gallery__card card ${isActive ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
            onClick={cardHandler}
        >
            <div className="card__information">
                <span className="card__tag">{category}</span>
                <span className="card__name" title={text}>{text}</span>
            </div>
        </div>
    );
};

export default GalleryTemplate;