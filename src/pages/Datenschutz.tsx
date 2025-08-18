import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Datenschutz() {
  return (
    <main className='font-sans text-stone-800 w-full min-h-screen px-4 py-12 bg-stone-100'>
      <div className='max-w-3xl mx-auto'>
        <Link to='/' className='hover:text-[#91d8eb] hover:underline flex'>
          <ArrowLeft />
        </Link>
        <h1 className='text-3xl font-bold my-6'>Datenschutzerklärung</h1>

        <p className='mb-6'>
          Verantwortlich im Sinne der Datenschutzgesetze, insbesondere der
          EU-Datenschutzgrundverordnung (DSGVO), ist:
        </p>

        <p>
          <strong>Florian Harten</strong>
        </p>
        <p>c/o Impressumservice Dein-Impressum</p>
        <p>Stettiner Str. 41</p>
        <p>35410 Hungen</p>
        <p>Tel.: 06183 8039368</p>
        <p className='mb-6'>
          E-Mail:{' '}
          <a
            href='mailto:mail@florian-harten.de'
            className='text-[#91d8eb] hover:underline'
          >
            mail@florian-harten.de
          </a>
        </p>

        <h2 className='text-xl font-semibold mt-10 mb-4'>Zugriffsdaten</h2>
        <p className='mb-6'>
          Beim Besuch dieser Website werden automatisch Informationen
          allgemeiner Natur erfasst. Diese Server-Logfiles beinhalten etwa:
        </p>
        <ul className='list-disc list-inside mb-6 space-y-1'>
          <li>IP-Adresse</li>
          <li>Datum und Uhrzeit</li>
          <li>aufgerufene Seiten</li>
          <li>Browsertyp und -version</li>
          <li>verwendetes Betriebssystem</li>
          <li>Referrer-URL</li>
        </ul>
        <p className='mb-6'>
          Diese Daten lassen keine direkten Rückschlüsse auf Ihre Person zu und
          dienen der Sicherstellung eines störungsfreien Betriebs der Seite.
        </p>

        <h2 className='text-xl font-semibold mt-10 mb-4'>Cookies</h2>
        <p className='mb-6'>Diese Website verwendet keine Cookies.</p>

        <h2 className='text-xl font-semibold mt-10 mb-4'>Kontaktaufnahme</h2>
        <p className='mb-6'>
          Wenn Sie mich per E-Mail kontaktieren, werden die gemachten Angaben
          zwecks Bearbeitung der Anfrage sowie für mögliche Anschlussfragen
          gespeichert. Diese Daten werden nicht ohne Ihre Einwilligung
          weitergegeben.
        </p>

        <h2 className='text-xl font-semibold mt-10 mb-4'>
          Rechte der betroffenen Person
        </h2>
        <p className='mb-4'>Sie haben jederzeit das Recht auf:</p>
        <ul className='list-disc list-inside mb-6 space-y-1'>
          <li>Auskunft über Ihre gespeicherten Daten</li>
          <li>Berichtigung unrichtiger Daten</li>
          <li>
            Löschung Ihrer Daten (sofern keine gesetzliche Aufbewahrungspflicht
            besteht)
          </li>
          <li>Einschränkung der Verarbeitung</li>
          <li>Datenübertragbarkeit</li>
          <li>Widerspruch gegen die Verarbeitung</li>
        </ul>

        <h2 className='text-xl font-semibold mt-10 mb-4'>
          Beschwerderecht bei der Aufsichtsbehörde
        </h2>
        <p className='mb-6'>
          Sie können sich mit einer Beschwerde an die zuständige
          Datenschutzaufsichtsbehörde wenden.
        </p>

        <p className='mb-2 font-semibold'>Zuständige Aufsichtsbehörde:</p>
        <p className='mb-6'>
          Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit
          <br />
          (Je nach Bundesland individuell – bitte ergänzen)
        </p>

        <h2 className='text-xl font-semibold mt-10 mb-4'>
          Änderung unserer Datenschutzbestimmungen
        </h2>
        <p className='mb-6'>
          Ich behalte mir vor, diese Datenschutzerklärung anzupassen, damit sie
          stets den aktuellen rechtlichen Anforderungen entspricht.
        </p>

        <p className='text-sm text-stone-500'>Stand: August 2025</p>
      </div>
    </main>
  );
}
