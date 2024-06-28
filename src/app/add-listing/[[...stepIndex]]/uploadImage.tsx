import React, { useState } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { CloudinaryContext, UploadWidget } from 'cloudinary-react';

const ImageUpload = () => {
    const [imageUrl, setImageUrl] = useState<string>('');

    const handleUpload = (result: any) => {
        if (result.event === 'success') {
            setImageUrl(result.info.secure_url);
        }
    };

    return (
        <CloudinaryContext cloudName="your_cloud_name">
            <UploadWidget
                sources={['local', 'url']}
                folder="uploads"
                uploadPreset="your_upload_preset"
                resourceType="image"
                onSuccess={handleUpload}
                buttonText="Upload Image"
                style={{ color: 'blue' }}
            />
            {imageUrl && (
                <div>
                    <h2>Uploaded Image:</h2>
                    <Image
                        publicId={imageUrl}
                        alt="Uploaded Image"
                        loading="lazy"
                        fetchFormat="auto"
                        width="300"
                    >
                        <Transformation quality="auto" />
                    </Image>
                </div>
            )}
        </CloudinaryContext>
    );
};

export default ImageUpload;
