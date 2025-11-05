import { cn } from '@/lib/utils';
import Image from 'next/image';

const ImageCard = ({ image, className }) => {
    return (
        <div
            className={cn(
                'image-card min-h-[390px] w-[354px] rounded-xl overflow-hidden ',
                className
            )}>
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

