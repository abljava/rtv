"use client";
import React, { Suspense, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { Loader } from "@/app/components/micro/Loader";

import { useGetAreasQuery } from "@/redux/api/areas.api";

import styles from "@/app/css/mainpage.module.css";
import stylesService from "@/app/css/service.module.css";

import { useMain, useStater } from "@/hooks/useStater";

import PageHeader from "@/app/components/micro/PageHeader";

import headerImage from "@/app/images/headers/serviceHeader.png";
import { Slider } from "@/app/components/Slider";
import ModuleWindow from "@/app/components/ModuleWindow";

export default function Page({ params }) {
  const router = useRouter();
  const { lang, moduleWindow } = useMain();

  const { isLoading, error, data } = useGetAreasQuery(lang);

  const header = {
    ru: "Услуги",
    en: "Services",
  };

  const buttonLang = {
    ru: "Подробнее",
    en: "More details",
  };

  useEffect(() => {}, [data, lang]);

  return (
    <>
      <Slider image={""} />

      <main className={`${styles.main} ${styles.contentpage}`}>
        <section className={`${stylesService.serviceBigContainer}`}>
          {!data ? (
            <Loader />
          ) : (
            data.data.map((item, index) => {
              return (
                <article
                  key={`newsBigKey_${index}`}
                  className={`${stylesService.serviceBlock}`}
                >
                  <h3>{item.attributes.title}</h3>

                  <Link href={`/routes/services/${item.id}`}>
                    {buttonLang[lang]}
                  </Link>
                </article>
              );
            })
          )}
        </section>
      </main>
      {moduleWindow ? <ModuleWindow /> : null}
    </>
  );
}
