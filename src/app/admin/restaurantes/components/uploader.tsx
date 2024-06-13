import React, { ChangeEvent, useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { PutBlobResult } from "@vercel/blob";
import useLoadStore from "@/store/load-store";
import useSnackStore from "@/store/snackbar-store";

const Input = styled("input")({
    display: "none",
});

const ImagePreview = styled("img")({
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
    marginRight: "8px",
});

const Uploader = ({
    linkValue,
    setLogoValue,
    logoValue,
}: {
    linkValue: string;
    logoValue: string;
    setLogoValue: (link: string) => void;
}) => {
    const [image, setImage] = useState("");
    const [file, setfile] = useState<File | null>(null);

    const snackError = useSnackStore((state) => state.setOpenError);
    const snackSuccess = useSnackStore((state) => state.setOpenSuccess);

    const handleImageChange = async (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const file = Array.from(
            (event.target as HTMLInputElement).files as ArrayLike<File>
        )[0];
        if (file.size / 1024 / 1024 > 2) {
            snackError("El archivo es muy grande (max 2MB)");
        } else {
            if (["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
                const imageUrl = URL.createObjectURL(file);
                setImage(imageUrl);
                setfile(file);
            } else {
                snackError(
                    "El archivo debe ser imagen (extensión jpg, jpeg o png)"
                );
            }
        }
    };

    const handleRemoveImage = () => {
        setImage("");
        setfile(null);
    };
    const setLoading = useLoadStore((state) => state.setLoading);

    return (
        <Box sx={{ mt: "15px" }}>
            <label htmlFor="icon-button-file">
                <Input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={handleImageChange}
                />
                <Button
                    variant="outlined"
                    color="primary"
                    component="span"
                    startIcon={<PhotoCamera />}
                    disabled={linkValue === "" || logoValue !== ""}
                >
                    Seleccionar Logo
                </Button>
            </label>
            <Button
                sx={{ ml: "20px" }}
                variant="contained"
                color="primary"
                component="span"
                startIcon={<CloudUploadIcon />}
                disabled={image === "" || logoValue !== ""}
                onClick={async () => {
                    setLoading(true);
                    const res = await fetch("/api/upload", {
                        method: "POST",
                        headers: {
                            "content-type":
                                file?.type || "application/octet-stream",
                            "image-path-name": `restaurante/${linkValue}/logo.png`,
                        },
                        body: file,
                    });
                    setLoading(false);
                    if (res.status === 200) {
                        const { url } = (await res.json()) as PutBlobResult;
                        setLogoValue(url);
                        snackSuccess("Logo subido");
                    } else {
                        const error = await res.text();
                        snackError(error);
                    }
                }}
            >
                Confirmar Logo
            </Button>
            <Box display="flex" flexWrap="wrap" mt={2}>
                <Box position="relative" display="inline-block" m={1}>
                    {image !== "" ? (
                        <>
                            <ImagePreview src={image} alt={"preview"} />
                            <IconButton
                                onClick={() => handleRemoveImage()}
                                color="secondary"
                                size="small"
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    background: "rgba(0, 0, 0, 0.5)",
                                    color: "white",
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </>
                    ) : null}
                </Box>
            </Box>
        </Box>
    );
};

export default Uploader;
