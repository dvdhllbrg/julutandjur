import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Jul utan djur</title>
      </Head>
      <div>
        <p>
          Jag som har byggt den här sajten heter David, men recepten kommer från massor av olika,
          fantastiska människor. Ett stort tack till alla som har låtit mig låna recept! Besök gärna
          deras sidor för fler recept:
        </p>
        <ul>
          <li><a href="http://vegania.net/">Vegania</a></li>
          <li><a href="http://veganen.blogspot.se/">Veganrecept & Galna Upptåg</a></li>
          <li><a href="http://veganvrak.blogspot.se/">Veganvrak</a></li>
          <li><a href="http://vegankrubb.se/">Vegankrubb</a></li>
          <li><a href="http://javligtgott.se/">Jävligt gott</a></li>
          <li><a href="http://amyspieceofcake.blogspot.se/">Amy&apos;s piece of cake</a></li>
          <li><a href="http://vardagsmatad.se/">Vardagsmatad</a></li>
          <li><a href="http://veganvintage.wordpress.com/">Veganvintage</a></li>
          <li><a href="http://vegokoll.se">Vegokoll</a></li>
          <li><a href="http://goodstore.se">Goodstore</a></li>
          <li><a href="http://pintomagasin.se">Pinto</a></li>
        </ul>
        <p>
          Stort tack också till podcasten
          {' '}
          <a href="http://www.veganprat.se/">Veganprat</a>
          {' '}
          som, förutom att
          vara allmänt grym, gav den ursprungliga inspirationen till denna sajt!
        </p>
        <p>
          Om du vill fortsätta göra gott för djuren och miljön även efter jul, eller bara är nyfiken på hur
          veganlivet är, rekommenderas
          {' '}
          <a href="http://veganutmaningen.se/">Den stora veganutmaningen</a>
          {' '}
          som samlar många tips, recept och information
          för personer som nyligen blivit veganer eller funderar på att bli det. Det finns också många Facebookgrupper som samlar
          människor som vill prata om veganism eller inspireras av vad andra äter. Ett exempel är
          {' '}
          <a href="http://www.facebook.com/groups/liteinspiration/">Bara lite jävla inspiration (om vegansk mat)</a>
          {' '}
          som rätt och slätt samlar &quot;tips och idéer på god, vegansk mat&quot;
          (utan några andra krav än just att det ska vara veganskt) och som är väldigt bra.
        </p>
        <p>
          Om du vill lära dig mer om djurrätt eller vad veganism faktiskt innebär
          rekommenderas
          {' '}
          <a href="http://www.djurensratt.se/vara-fragor">Djurens Rätts faktaarkiv</a>
          {' '}
          där det går att hitta
          information om det mesta. Vill du lära dig mer om hur det går till i djurindustrin rekommenderas
          Djurrättsalliansens fantastiska projekt
          {' '}
          <a href="http://djurfabriken.se/">Djurfabriken</a>
          .
        </p>
      </div>
    </>
  );
}
