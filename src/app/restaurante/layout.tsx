import React, { Suspense } from 'react';
import Loader from './components/page-loader';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <body>
                <Suspense fallback={<Loader />}>
                    {children}
                </Suspense>
            </body>
        </html>
    );
}