import React, { ChangeEvent, useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
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

const Uploader = ({ setFile }: { setFile: (f: File | null) => void }) => {
    const [logoValue, setLogoValue] = useState("");
    const snackError = useSnackStore((state) => state.setOpenError);

    const handleImageChange = async (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const f = Array.from(
            (event.target as HTMLInputElement).files as ArrayLike<File>
        )[0];
        if (f.size / 1024 / 1024 > 2) {
            snackError("El archivo es muy grande (max 2MB)");
        } else {
            if (["image/jpeg", "image/png", "image/jpg"].includes(f.type)) {
                const imageUrl = URL.createObjectURL(f);
                setLogoValue(imageUrl);
                setFile(f);
            } else {
                snackError(
                    "El archivo debe ser imagen (extensión jpg, jpeg o png)"
                );
            }
        }
    };

    const handleRemoveImage = () => {
        setLogoValue("");
        setFile(null);
    };

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
                >
                    Seleccionar Logo
                </Button>
            </label>
            <Box display="flex" flexWrap="wrap" mt={2}>
                <Box position="relative" display="inline-block" m={1}>
                    {logoValue !== "" ? (
                        <>
                            <ImagePreview src={logoValue} alt={"preview"} />
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
