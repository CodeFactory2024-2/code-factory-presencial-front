import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es-CO">
      <Head>
        <title>Gestión de vuelos A</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Página para gestionar vuelos y aeronaves de Singapur airlines del proyecto Code-Factory"
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
