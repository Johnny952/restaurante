import React from "react";
import GlobalWrapper from "./animation/global-wrapper";

export interface BackgroundInterface {
    image?: string | null;
    children: React.ReactElement | React.ReactElement[];
}


export default function Background({ image, children }: BackgroundInterface) {
    return (
        <GlobalWrapper>
            <div
                style={{
                    position: "relative",
                }}
            >
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.75)", // Ajusta la opacidad según necesites
                        zIndex: -1,
                    }}
                />
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: image ? `url(${image})` : undefined,
                        backgroundColor: image ? "black" : undefined,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center top",
                        zIndex: -2,
                    }}
                />
                <div
                    style={{
                        position: "relative",
                        zIndex: 1,
                        minHeight: "100vh", // Asegura que el contenido ocupe al menos toda la altura de la pantalla
                    }}
                >
                    {children}
                </div>
            </div>
        </GlobalWrapper>
    );
}
