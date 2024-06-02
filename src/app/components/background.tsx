import React from "react";
import { BackgroundInterface } from "./background.d";

export default function Background({ image, children }: BackgroundInterface) {
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
            boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.8)',
            height: '100vh',
        }}>
            {children}
        </div>
    )
}