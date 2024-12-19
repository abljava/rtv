"use client";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { Loader } from "@/app/components/micro/Loader";

import { useGetAreasQuery } from "@/redux/api/areas.api";

import styles from "@/app/css/mainpage.module.css";
import localstyles from "@/app/css/pagesTarrifs.module.css";

import { useMain, useStater } from "@/hooks/useStater";
import { Forms } from "@/app/components/Forms";
import { useGetTarrifsQuery } from "@/redux/api/dinamicPages.api";
import ModuleWindow from "@/app/components/ModuleWindow";

export default function Page({}) {
  const router = useRouter();
  const params = useSearchParams();

  const { lang, mobile, moduleWindow } = useMain();

  const [selectType, setSelectType] = useState(
    params.get("select") ? Number.parseInt(params.get("select")) : 0
  );

  const { isLoading, error, data } = useGetTarrifsQuery(lang);

  const header = {
    ru: "Услуги",
    en: "Services",
  };

  useEffect(() => {}, [data, lang]);
  useEffect(() => {});

  return (
    <>
      <main
        className={`${styles.main} ${styles.contentpage} ${localstyles.tarrifPage}`}
      >
        <section className={`${localstyles.tarrifsContainer}`}>
          <div className={`${localstyles.leftBlock}`}>
            <div className={`${localstyles.upNav}`}>
              {!isLoading ? (
                data &&
                typeof data.data != "undefined" &&
                Array.isArray(data.data.attributes.tarrifs.data) ? (
                  data.data.attributes.tarrifs.data.map((item, index) => {
                    return (
                      <button
                      key={item.id}
                        onClick={() => {
                          if (!mobile) {
                            setSelectType(index);
                          }
                        }}
                        onTouchStart={() => {
                          setSelectType(index);
                        }}
                        style={{
                          background: selectType != index ? `#F0F0F0` : null,
                          color: selectType != index ? `#292929` : null,
                        }}
                      >
                        {item.attributes.title}
                      </button>
                    );
                  })
                ) : null
              ) : (
                <Loader />
              )}
            </div>
            <div className={`${localstyles.downForm}`}>
              <Forms type={"tarrifs"} />
            </div>
          </div>
          <div className={`${localstyles.rightBlock}`}>
            {!isLoading ? (
              data &&
              typeof data.data != "undefined" &&
              Array.isArray(data.data.attributes.tarrifs.data) ? (
                data.data.attributes.tarrifs.data.map((item, index) => {
                  if (index === selectType) {
                    return (
                      <div key={item.id}>
                        <h2>{item.attributes.bigTitle}</h2>
                        <div
                          className={""}
                          dangerouslySetInnerHTML={{
                            __html: item.attributes.fullText,
                          }}
                        ></div>
                      </div>
                    );
                  }
                })
              ) : null
            ) : (
              <Loader />
            )}
          </div>
        </section>

        <div className={localstyles.toCenterBlock}>
          <Forms type={"main"} />
        </div>
      </main>
      {moduleWindow ? <ModuleWindow /> : null}
    </>
  );
}

/*

                    {
                        (!isLoading) ?
                            (data && typeof data.data != 'undefined') ?
                            data.data.map((item, index) => {
                                return(
                                    <article key = {`newsBigKey_${index}`} className = {`${localstyles.videoBlock}`}>

                                    </article>
                                )
                            })
                                : null
                            : <Loader />
                    }

 */
