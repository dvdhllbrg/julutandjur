import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Jul utan djur</title>
      </Head>
      <div>
        <p>
          Varje december får hundratusentals djur (
          <a href="http://www.svensktkott.se/aktuellt/nyheter/fakta-om-julskinka/">400 000 grisar bara för julskinkan</a>
          ) sätta livet till,
          bara för att vi vill sätta kött på julbordet. Detta är inte bara sorgligt för djuren, utan också
          för miljön –
          {' '}
          <a href="http://www.livsmedelsverket.se/matvanor-halsa--miljo/miljo/miljosmarta-matval2/kott/">
            enligt Jordbruksverket står köttproduktionen för nästan 15 % av världens totala utsläpp
            av växthusgaser
          </a>
          .
        </p>
        <p>
          Så här behöver det inte vara. Det finns ingenting som säger att vi måste äta djur bara för att det
          är jul. Det finns hundratals veganska (fria från kött, mjölk, ägg och andra animaliska produkter)
          alternativ som är precis lika goda (eller godare!) och som inte kräver något lidande eller död.
          Låter inte det mycket bättre?
        </p>
        <p>
          Vissa tror att veganer bara äter tofu och linser dagarna i ända och lider av sådan
          näringsbrist att de faller ihop för minsta vindpust. Det kunde inte vara längre från sanningen!
          Visst finns det några tofurecept här på sajten (testa ett, du kanske blir förvånad!), men det finns
          en enorm bredd i vegetabiliska livsmedel – ingen risk att du tröttnar! Och näringen?
          {' '}
          <a href="http://www.vegokoll.se/naringen">
            Det råder
            ingen brist på den heller.
          </a>
        </p>
        <p>Välj en vegansk jul i år! För djurens, miljöns och din egen skull.</p>
      </div>
    </>
  );
}
