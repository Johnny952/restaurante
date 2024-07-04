"use client";
import { ImageAsync } from "@/components/image-async";
import { motion } from "framer-motion";

export default function LogoAnimated({
    image,
    loading = false,
}: {
    image: string;
    loading?: boolean;
}) {
    return (
        <motion.div
            animate={{ y: [-25, 0], opacity: [0, 1] }}
            transition={{ duration: 0.8 }}
        >
            <ImageAsync
                loadingImg={loading}
                src={image}
                alt="Logo"
                style={{
                    width: "100%",
                    height: "auto",
                }}
                sizes="100vw"
                width={100}
                height={100}
                priority={true}
                radius="15"
            />
        </motion.div>
    );
}
