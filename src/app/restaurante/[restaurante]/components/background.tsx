import React from "react";

export default function Background({ image, children }: { image: string, children: React.ReactElement | React.ReactElement[] }) {
    return (
        <div style={{
            WebkitBackgroundSize: 'cover',
            MozBackgroundSize: 'cover',
            OBackgroundSize: 'cover',
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center top',
            backgroundAttachment: 'fixed',
            boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.7)',
            height: '100vh',
        }}>
            {children}
        </div>
    )
}