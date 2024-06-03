"use client";
import { Box } from "@mui/material";
import Image, { ImageProps } from "next/image";
import { useState } from "react";
import ContentLoader from "react-content-loader";

export const ImageAsync = ({ src, alt, radius = "0", ...props }: ImageProps & { radius?: string }) => {
    const [reveal, setReveal] = useState(false);
    const imgDisplay = reveal ? "inline-block" : "none";
    const loader = reveal ? "none" : "inline-block";

    return (
        <Box>
            <Image
                src={src}
                alt={alt}
                width={props.width}
                height={props.height}
                {...props}
                style={{ ...props.style, display: imgDisplay }}
                onError={() => setReveal(true)}
                onLoad={() => setReveal(true)}
            />
            <ContentLoader
                style={{ display: loader, }}
                speed={2}
                width='100%'
                height='100%'
                viewBox={`0 0 ${props.width} ${props.height}`}
                backgroundColor="#000000"
                foregroundColor="#ecebeb"
                uniqueKey="loader"
            >
                <rect x="0" y="0" rx={radius} ry={radius} width='100%' height='100%' />
            </ContentLoader>
        </Box>
    );
};