import LinkBreadcrumbs from "@/components/link-breadcrumbs";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ImageAsync } from "@/components/image-async";
import { LinkBreadcrumbsProps } from "@/components/link-breadcrumbs/index.d";
import React from "react";

export default function EditLayout({
    pathname,
    redirect,
    children,
    breadcrumbs,
    goBack,
    title,
    data,
    images,
}: {
    pathname: string;
    redirect: (link: string) => void;
    children?: string | JSX.Element | JSX.Element[];
    goBack: () => void;
    title: string;
    data: { value?: string; name: string; link: string }[];
    images?: { src?: string; link: string; name: string }[];
} & LinkBreadcrumbsProps) {
    return (
        <div>
            <LinkBreadcrumbs breadcrumbs={breadcrumbs} />

            <Paper
                elevation={0}
                sx={{
                    mt: "20px",
                    p: "20px",
                    border: "1px solid rgba(0, 0, 0, 0.12)",
                    color: "rgb(114, 119, 122)",
                }}
            >
                <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                        <Button
                            variant="text"
                            startIcon={<ArrowBackIcon />}
                            onClick={goBack}
                        >
                            Atrás
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Typography variant="h6">{title}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container rowSpacing={2}>
                            {data.map((item, idx) => (
                                <React.Fragment key={idx}>
                                    <Grid item xs={12} md={10}>
                                        <Typography variant="body1">
                                            {item.name}: {item.value}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            sx={{ height: "100%" }}
                                        >
                                            <Box flexGrow={1} />
                                            <Button
                                                variant="contained"
                                                onClick={() =>
                                                    redirect(
                                                        `${pathname}?${item.link}=1`
                                                    )
                                                }
                                            >
                                                Cambiar
                                            </Button>
                                        </Box>
                                    </Grid>
                                </React.Fragment>
                            ))}
                        </Grid>
                    </Grid>

                    {images
                        ? images.map((image) => (
                              <>
                                  <Grid item xs={12}>
                                      <Divider />
                                  </Grid>

                                  <Grid item xs={12}>
                                      <Typography variant="body2">
                                          {image.name}
                                      </Typography>
                                  </Grid>

                                  <Grid item xs={12}>
                                      <Grid container>
                                          <Grid item xs={12} md={6}>
                                              <Box height={300} width={300}>
                                                  <ImageAsync
                                                      alt="logo"
                                                      src={image.src || ""}
                                                      loadingImg={
                                                          !image.src ||
                                                          image.src === ""
                                                      }
                                                      sizes="100vw"
                                                      width="100"
                                                      height="100"
                                                      style={{
                                                          width: "100%",
                                                          height: "auto",
                                                      }}
                                                  />
                                              </Box>
                                          </Grid>
                                          <Grid item xs={12} md={6}>
                                              <Box
                                                  display="flex"
                                                  alignItems="center"
                                                  sx={{ height: "100%" }}
                                              >
                                                  <Box flexGrow={1} />
                                                  <Button
                                                      sx={{ my: "10px" }}
                                                      variant="contained"
                                                      onClick={() =>
                                                          redirect(
                                                              `${pathname}?${image.link}=1`
                                                          )
                                                      }
                                                  >
                                                      Cambiar
                                                  </Button>
                                              </Box>
                                          </Grid>
                                      </Grid>
                                  </Grid>
                              </>
                          ))
                        : null}
                </Grid>
                {children}
            </Paper>
        </div>
    );
}
