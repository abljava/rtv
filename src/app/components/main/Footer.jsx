"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetFooterQuery } from "@/redux/api/pages.api";
import styles from "@/app/css/footer.module.css";
import { Loader } from "@/app/components/micro/Loader";
import { NavigationBar } from "@/app/components/micro/NavigationBar";
import { useMain } from "@/hooks/useStater";

export const Footer = ({}) => {
  const { lang } = useMain();
  const { isLoading, error, data } = useGetFooterQuery(lang);
  const date = new Date();
  const year = date.getFullYear();

  useEffect(() => {}, [data]);

  return (
    <>
      <footer className={`${styles.footerContainer}`}>
        <div className={`${styles.footerBlock}`}>
          {isLoading ? (
            <Loader />
          ) : data ? (
            <>
              <Image
                unoptimized
                src={`${process.env.NEXT_PUBLIC_CONNECT}://${process.env.NEXT_PUBLIC_URL_API}${data.data.attributes.footerLogo.data.attributes.url}`}
                alt=""
                fill
              />
            </>
          ) : (
            <h3>Ошибка...Компонент: Footer</h3>
          )}
        </div>
        <div className={`${styles.footerBlock}`}>
          {isLoading ? (
            <Loader />
          ) : data ? (
            <>
              <h2>{data.data.attributes.footerTitle}</h2>
            </>
          ) : (
            <h3>Ошибка...Компонент: Footer</h3>
          )}
        </div>
        <div className={`${styles.footerBlock}`}>
          {isLoading ? (
            <Loader />
          ) : data ? (
            <>
              <div className={`${styles.footerRows}`}>
                <a href={`tel:${data.data.attributes.footerTel}`}>
                  {data.data.attributes.footerTel}
                </a>

                <Image src={"/icons/wa_footer.png"} alt="Иконка" fill />
              </div>
              <div className={`${styles.footerRows}`}>
                <address>{data.data.attributes.footerAddress}</address>
              </div>
              <div className={`${styles.footerRows}`}>
                <a href={`mailto:${data.data.attributes.callbackMail}`}>
                  {data.data.attributes.callbackMail}
                </a>
              </div>
            </>
          ) : (
            <h3>Ошибка...Компонент: Footer</h3>
          )}
        </div>
        <div className={`${styles.footerNav}`}>
          {isLoading ? (
            <Loader />
          ) : data ? (
            <>
              <NavigationBar lang={lang} place={"footer"} />
            </>
          ) : (
            <h3>Ошибка...Компонент: Footer</h3>
          )}
        </div>
      </footer>
    </>
  );
};
