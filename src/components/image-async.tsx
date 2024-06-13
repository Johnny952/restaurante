"use client";
import { Box, Collapse } from "@mui/material";
import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";

export const ImageAsync = ({
    src,
    alt,
    radius = "0",
    ...props
}: ImageProps & { radius?: string }) => {
    const [reveal, setReveal] = useState<boolean>(false);
    const loader = reveal ? "none" : "inline-block";

    return (
        <Box>
            <Collapse in={reveal}>
                <Image
                    src={src}
                    alt={alt}
                    width={props.width}
                    height={props.height}
                    {...props}
                    style={{ ...props.style }}
                    onError={() => setReveal(true)}
                    onLoad={() => {
                        setReveal(true);
                    }}
                />
            </Collapse>
            <ContentLoader
                style={{ display: loader }}
                speed={2}
                width="100%"
                height="100%"
                viewBox={`0 0 ${props.width} ${props.height}`}
                backgroundColor="#000000"
                foregroundColor="#ecebeb"
                uniqueKey="loader"
            >
                <rect
                    x="0"
                    y="0"
                    rx={radius}
                    ry={radius}
                    width="100%"
                    height="100%"
                />
            </ContentLoader>
        </Box>
    );
};
