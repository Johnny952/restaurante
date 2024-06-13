"use client";
import { useRouter } from "next/navigation";
import { LinkBreadcrumbsProps } from "./index.d";
import { Breadcrumbs, Link, Typography, styled } from "@mui/material";

const CustomLink = styled(Link)(({ theme }) => ({
    "&:hover": {
        cursor: "pointer",
    },
    textDecoration: "none",
}));

export default function LinkBreadcrumbs({ breadcrumbs }: LinkBreadcrumbsProps) {
    const router = useRouter();
    return (
        <Breadcrumbs aria-label="breadcrumb">
            {breadcrumbs.map((breadcrumb, idx) =>
                breadcrumb.link ? (
                    <CustomLink
                        onClick={() => router.push(breadcrumb.link || "/")}
                        sx={{}}
                        key={idx}
                    >
                        {breadcrumb.name}
                    </CustomLink>
                ) : (
                    <Typography key={idx} color="text.primary">
                        {breadcrumb.name}
                    </Typography>
                )
            )}
        </Breadcrumbs>
    );
}
