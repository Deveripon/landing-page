const VideoBackground = ({ children }) => {
    return (
        <div className='relative w-full min-h-screen overflow-hidden'>
            <video
                autoPlay
                loop
                muted
                className='absolute inset-0 w-full h-full object-cover z-0'>
                <source src='/video6.mp4' type='video/mp4' />
                Your browser does not support the video tag.
            </video>
            {children}
        </div>
    );
};

export default VideoBackground;

