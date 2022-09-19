import React, {useState} from 'react';
import ImageUploading, {ImageListType, ImageType} from 'react-images-uploading';
import {updatePhoto} from "../../redux/profileSlice";
import {useAppDispatch} from "../../hooks/hooks";

export const ImageUploader = () => {
    const dispatch = useAppDispatch()

    const [images, setImages] = useState<ImageType[]>([]);
    const maxNumber = 1;

    const onChange = (imageList: ImageListType) => {
        setImages(imageList)
        imageList[0].file && dispatch(updatePhoto(imageList[0].file))
    };

    return (
        <div className="App">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                      onImageUpload,
                  }) => (
                    <div className="upload__image-wrapper">
                        <button onClick={onImageUpload}>Update photo</button>
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}