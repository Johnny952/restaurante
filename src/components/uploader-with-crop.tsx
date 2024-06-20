/* eslint-disable @next/next/no-img-element */
import { Button, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactCrop, { Crop, PercentCrop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import ImageIcon from "@mui/icons-material/Image";

const cropImage = (originalFile: CustomFile, crop: Crop): Promise<File> => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            const img = new Image();
            img.src = fileReader.result as string;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const newCrop = {
                    x: (crop.x * img.width) / 100,
                    y: (crop.y * img.height) / 100,
                    width: (crop.width * img.width) / 100,
                    height: (crop.height * img.height) / 100,
                };
                const scaleX = img.naturalWidth / img.width;
                const scaleY = img.naturalHeight / img.height;
                canvas.width = newCrop.width;
                canvas.height = newCrop.height;
                const ctx = canvas.getContext("2d");
                ctx?.drawImage(
                    img,
                    newCrop.x * scaleX,
                    newCrop.y * scaleY,
                    newCrop.width * scaleX,
                    newCrop.height * scaleY,
                    0,
                    0,
                    newCrop.width,
                    newCrop.height
                );

                canvas.toBlob((blob) => {
                    const croppedFile = new File(
                        [blob as Blob],
                        originalFile.name,
                        {
                            type: originalFile.type,
                            lastModified: originalFile.lastModified,
                        }
                    );
                    resolve(croppedFile);
                }, originalFile.type);
            };
        };
        fileReader.readAsDataURL(originalFile);
    });
};

const loadImage = (
    setCropData: (args: PercentCrop) => void,
    imageUrl: string
) => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
        const minDimension = Math.min(img.height, img.width);
        const maxDimension = Math.max(img.height, img.width);
        const perc = (minDimension / maxDimension) * 100;
        const condition = img.width > img.height;
        const width = condition ? perc : 100;
        const height = condition ? 100 : perc;

        setCropData({
            x: 0,
            y: 0,
            width,
            height,
            unit: "%",
        });
    };
    img.onerror = (err) => {
        console.log("img error");
        console.error(err);
    };
};

type CustomFile = { preview: string } & File;

export default function UploaderWithCrop({
    setCroppedFile,
}: {
    setCroppedFile: (f: File) => void;
}) {
    const [file, setFile] = useState<null | CustomFile>(null);
    const [cropData, setCropData] = useState<PercentCrop | undefined>(
        undefined
    );

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpeg", ".jpg"],
        },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            setFile(
                Object.assign(acceptedFiles[0], {
                    preview: URL.createObjectURL(acceptedFiles[0]),
                })
            );
            const f = acceptedFiles[0] as unknown as CustomFile;
            loadImage(setCropData, f.preview);
        },
    });

    const handleCropChange = (_crop: PixelCrop, percCrop: PercentCrop) => {
        setCropData(percCrop);
    };

    const handleCropComplete = async (
        croppedArea: PixelCrop,
        croppedAreaPixels: PercentCrop
    ) => {
        const c = await cropImage(file as CustomFile, croppedAreaPixels);
        setCroppedFile(c);
    };

    const thumbs = (
        <div>
            <ReactCrop
                crop={cropData}
                onChange={handleCropChange}
                onComplete={handleCropComplete}
                aspect={1}
            >
                <img src={file?.preview || ""} alt="" />
            </ReactCrop>
        </div>
    );

    return (
        <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} md={6}>
                <Paper
                    elevation={3}
                    sx={{ p: "16px" }}
                    square={false}
                    variant="outlined"
                >
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Grid container textAlign="center" rowSpacing={1}>
                            <Grid item xs={12}>
                                <ImageIcon sx={{ fontSize: "80px" }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary">
                                    Subir Imagen
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" gutterBottom>
                                    Arrastra y suelta la imagen aquí, o haz clic
                                    para seleccionarla.
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        marginBottom: 16,
                    }}
                >
                    {thumbs}
                </div>
            </Grid>
        </Grid>
    );
}
