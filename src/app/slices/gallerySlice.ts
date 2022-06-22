import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { galleryCardsTypes } from '../../Types/gallerySliceTypes';

// /. imports

export const fetchImagesData = createAsyncThunk(
    'tableSlice/fetchUsersData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await
                fetch('https://api.unsplash.com/search/photos/?client_id=7qBZMJtsb638mTv6UpQozhM0hW0dTxCWY-vSSvcJAHQ&query=content_filter=high&orientation=portrait');

            if (!response.ok) {
                throw new Error('Response: server error!');
            }

            const data = await response.json();

            return data.results;

        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

// /. AsyncThunk

interface gallerySliceState {
    galleryCards: galleryCardsTypes[],
    status: string,
    error: string
}

// /. interfaces

const initialState: gallerySliceState = {
    galleryCards: [],
    status: '',
    error: ''
};

// /. initialState

const gallerySlice = createSlice({
    name: 'gallerySlice',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchImagesData.pending.type]: (state) => {
            state.status = 'loading';
        },
        [fetchImagesData.fulfilled.type]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'success';

            action.payload.forEach((item: any) => {
                state.galleryCards.push(
                    {
                        id: item.id,
                        category: 'Architect',
                        text: item.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                        image: item.urls.regular,
                        isActive: false
                    }
                );
            });
        },
        [fetchImagesData.rejected.type]: (state) => {
            state.status = 'failed';
        }
    }
});

export const {
} = gallerySlice.actions;

export default gallerySlice.reducer;