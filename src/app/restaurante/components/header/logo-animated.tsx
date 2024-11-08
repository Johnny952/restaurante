"use client";
import { ImageAsync } from "@/components/image-async";
import { motion } from "framer-motion";

export default function LogoAnimated({
    image,
    loading = false,
    isMobile,
}: {
    image: string;
    loading?: boolean;
    isMobile: boolean;
}) {
    return (
        <motion.div
            animate={{
                y: [-25, 0],
                opacity: [0, 1],
            }}
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <ImageAsync
                loadingImg={loading}
                src={image}
                alt="Logo"
                style={{
                    width: "auto",
                    height: "100%",
                }}
                sizes="100vw"
                width={isMobile ? 100 : 250}
                height={isMobile ? 100 : 250}
                priority={true}
                radius={isMobile ? "10" : "15"}
            />
        </motion.div>
    );
}
