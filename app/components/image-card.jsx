import { cn } from '@/lib/utils';
import Image from 'next/image';

const ImageCard = ({ image, className }) => {
    return (
        <div
            className={cn(
                'image-card md:h-[390px] h-[280px] md:w-[354px] w-[250px] rounded-xl overflow-hidden ',
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

