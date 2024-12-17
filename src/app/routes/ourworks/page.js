'use client';
import React, { Suspense } from 'react';
import Image from 'next/image';

import styles from '@/app/css/mainpage.module.css';
import localstyles from '@/app/css/pagesOurWorks.module.css';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { Forms } from '@/app/components/Forms';
import { Loader } from '@/app/components/micro/Loader';
import { useEffect } from 'react';

import { useGetOurWorksQuery } from '@/redux/api/dinamicPages.api';
import { useMain } from '@/hooks/useStater';
import Link from 'next/link';
import ModuleWindow from '@/app/components/ModuleWindow';

export default function Page({ params }) {
  const router = useRouter();
  const { lang, moduleWindow } = useMain();

  const { isLoading, error, data } = useGetOurWorksQuery(lang);

  useEffect(() => {}, [data]);

  return (
    <>
      <main className={`${styles.main} ${styles.contentpage}`}>
        <section
          className={`${styles.newsContainer} ${localstyles.worksContainer} ${localstyles.worksContainer}`}
        >
          {!isLoading && !error ? (
            data && Array.isArray(data.data) ? (
              data.data.map((item, index) => {
                if (index < 5)
                  return (
                    <Link href={`/routes/ourworks/${item.id}`} key={item.id}>
                      <div
                        className={`${localstyles.w100} ${localstyles.workBlock}`}
                      >
                        <Image
                          unoptimized
                          src={`${process.env.NEXT_PUBLIC_CONNECT}://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.image.data.attributes.url}`}
                          alt={item.attributes.title}
                          fill
                        />
                        <p>{item.attributes.createdAt.split('T')[0]}</p>
                        <h2>{item.attributes?.title}</h2>
                        <p>{item.attributes.text}</p>
                      </div>
                    </Link>
                  );
              })
            ) : (
              <h3>Ошибка получения данных! Страница: Наши работы</h3>
            )
          ) : (
            <Loader />
          )}
        </section>

        <div className={localstyles.toCenterBlock}>
          <Forms type={'main'} />
        </div>

        <section
          className={`${styles.newsContainer} ${localstyles.worksContainer} ${localstyles.worksContainer}`}
        >
          {!isLoading && !error ? (
            data && Array.isArray(data.data) ? (
              data.data.map((item, index) => {
                if (index >= 5)
                  return (
                    <Link href={`/routes/ourworks/${item.id}`} key={item.id}>
                      <div
                        className={`${localstyles.w100} ${localstyles.workBlock}`}
                      >
                        <Image
                          unoptimized
                          src={`${process.env.NEXT_PUBLIC_CONNECT}://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.image.data.attributes.url}`}
                          alt={item.attributes.title}
                          fill
                        />
                        <p>{item.attributes.createdAt.split('T')[0]}</p>
                        <h2>{item.attributes?.title}</h2>
                        <p>{item.attributes.text}</p>
                      </div>
                    </Link>
                  );
              })
            ) : (
              <h3>Ошибка получения данных! Страница: Наши работы</h3>
            )
          ) : (
            <Loader />
          )}
        </section>
      </main>
      {moduleWindow ? <ModuleWindow /> : null}
    </>
  );
}
