interface PageProps {
  title: string;
  link: string;
  author: string;
  licence: string;
  licenceLink: string;
  title2?: string;
  link2?: string;
  author2?: string;
  licence2?: string;
  licence2Link?: string;
}

const Attribution = ({
  title,
  link,
  author,
  licence,
  licenceLink,
  title2,
  link2,
  author2,
  licence2,
  licence2Link,
}: PageProps) => {
  return (
    <div className='absolute bottom-5 left-5 right-5'>
      <div className='flex bg-stone-900/50 rounded-md'>
        <p className='text-center text-xs md:text-sm'>
          "{title}" (
          <a href={link} target='_blank'>
            {link}
          </a>
          ) by {author} is licensed under {licence} (
          <a href={licenceLink} target='_blank'>
            {licenceLink}
          </a>
          ).
        </p>
      </div>
      {title2 && (
        <div className='flex bg-stone-900/50 rounded-md'>
          <p className='text-center text-xs md:text-sm'>
            "{title2}" (
            <a href={link2} target='_blank'>
              {link2}
            </a>
            ) by {author2} is licensed under {licence2} (
            <a href={licence2Link} target='_blank'>
              {licence2Link}
            </a>
            ).
          </p>
        </div>
      )}
    </div>
  );
};

export default Attribution;
