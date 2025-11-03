import Image from 'next/image';

const ImageCard = ({ image }) => {
    return (
        <div className='image-card min-h-[400px] w-82 rounded-xl overflow-hidden '>
            <Image
                src={image}
                className='rounded-xl object-cover'
                alt='Image'
                fill
            />
        </div>
    );
};

export default ImageCard;

