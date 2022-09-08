import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-gray-50">
        <Main />
        <NextScript />
        <Script
          src="https://unpkg.com/flowbite@1.5.2/dist/flowbite.js"
          defer
        ></Script>
        {/* <Script src="flow"></Script> */}
      </body>
    </Html>
  )
}
