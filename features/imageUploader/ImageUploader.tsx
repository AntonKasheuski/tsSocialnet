import React, {useState} from 'react';
import ImageUploading, {ImageListType, ImageType} from 'react-images-uploading';
import {updatePhoto} from "../../redux/profileSlice";
import {useAppDispatch} from "../../hooks/hooks";

export const ImageUploader = () => {
    const dispatch = useAppDispatch()

    const [images, setImages] = useState<ImageType[]>([]);
    const maxNumber = 1;

    const onChange = (imageList: ImageListType) => {
        setImages(imageList);
    };

    const onSendHandler = () => {
        images[0].file && dispatch(updatePhoto(images[0].file))
    }

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
                        <button onClick={onSendHandler}>Send</button>
                        {/*{imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                    <button onClick={() => onImageUpdate(index)}>Update</button>
                                    <button onClick={() => onImageRemove(index)}>Remove</button>
                                    <button onClick={onSendHandler}>Send</button>
                                </div>
                            </div>
                        ))}*/}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}