import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function Impressum() {
  return (
    <main className='font-sans text-stone-800 w-full min-h-screen px-4 py-20 bg-stone-100'>
      <div className='max-w-3xl mx-auto'>
        <Link to='/' className='hover:text-[#91d8eb] hover:underline flex'>
          <ArrowLeft />
        </Link>

        <h1 className='text-3xl font-bold my-6'>Impressum</h1>

        <section className='space-y-4'>
          <h2 className='text-xl font-semibold'>Angaben gemäß § 5 DDG</h2>
          <p>
            <strong>Florian Harten</strong>
          </p>
          <p>c/o Impressumservice Dein-Impressum</p>
          <p>Stettiner Str. 41</p>
          <p>35410 Hungen</p>
          <p>Tel.: 06183 8039368</p>
          <p className='italic text-gray-500'>
            Bitte versenden Sie keine Pakete an dieser Adresse.
          </p>
        </section>

        <section className='space-y-4 mt-6'>
          <h2 className='text-xl font-semibold'>Kontakt:</h2>
          <p>
            <strong>E-Mail:</strong>{' '}
            <a
              href='mailto:mail@florian-harten.de'
              className='text-[#91d8eb] hover:underline'
            >
              mail@florian-harten.de
            </a>
          </p>
        </section>

        <section className='space-y-4 mt-6'>
          <h2 className='text-xl font-semibold'>
            Verbraucherstreitbeilegung / Universalschlichtungsstelle
          </h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>
        </section>

        <section className='space-y-4 mt-6'>
          <h2 className='text-xl font-semibold'>Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte
            auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
            §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
            überwachen oder nach Umständen zu forschen, die auf eine
            rechtswidrige Tätigkeit hinweisen.
          </p>
          <p>
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
            Informationen nach den allgemeinen Gesetzen bleiben hiervon
            unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
            Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
            Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
            Inhalte umgehend entfernen.
          </p>
        </section>

        <section className='space-y-4 mt-6'>
          <h2 className='text-xl font-semibold'>Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
          <p>
            Downloads und Kopien dieser Seite sind nur für den privaten, nicht
            kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser
            Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
            Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
            gekennzeichnet.
          </p>
          <p>
            Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam
            werden, bitten wir um einen entsprechenden Hinweis. Bei
            Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte
            umgehend entfernen.
          </p>
        </section>
      </div>
    </main>
  );
}

export default Impressum;
