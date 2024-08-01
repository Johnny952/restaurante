This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## TODO

-Premios y descuentos a clientes registrados (envío de mails automáticos)

# Ventas

-   Clientes (link restaurante)

# Restaurante

-   Guardar feeback en backend
-   Conectar pago a través de la plataforma (webpay, bancos, etc)
-   Garzón IA virtual
-   Garzón por voz
-   Botón de llamado garzones
-   Promociones
-   Mas de un pedido por mesa
-   Modificación de pedidos solo hasta que no haya sido tomado
-   Vista Restaurante antes de vista selección de lenguajes
    -   Cómo llegar
    -   Reservaciones
    -   Video promocional
-   Conectar QR con mesa
-   Pedido y Pago cuentas separadas
-   Login Invitado, guardado de pedidos en base de datos compartido para la mesa

# Admin

# Cocina

-   Agregar priority a orders con default 1, al hacer la consulta ordenar por prioridad primero, fecha creación segundo. Mostrar prioridad en el pedido.
-   Completado parcial para bebestibles (quizás? no muy seguro)
-   Conectar a backend

# Owner

# Waiter

-   Agregar propiedades deleted: booleano
-   Agregar front para cuando una mesa fue borrada (en modo edición no deberían crearse las mesas borradas, simiplemente se eliminan del store y las que ya fueron creadas y eliminadas en backend, deberían mostrarse de otra forma)
-   Corregir tipos para las respuestas basados en la base de datos (ids seriales son number)
-   Mostrar número de mesa
-   Mostrar cuando una mesa llama a un mesero
-   Mostrar cuando el pedido de una mesa está listo
-   Mostrar el estado de los pedidos de cada mesa

-   Agregar array de mesas nuevas creadas en array distinto a las de la base de datos
-   Agregar eliminación y edición de mapa (status para los mapas en base de datos)
-   Modificar visualización y edición de mapa /:restaurant/mesero/:map/ver (/editar)
