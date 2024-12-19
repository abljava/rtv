"use client";
import Image from "next/image";
import Link from "next/link";

import { useEffect } from "react";

import { useMain, useStater } from "@/hooks/useStater";
import { useActions } from "@/hooks/useActions";

import { Loader } from "@/app/components/micro/Loader";

import { useGetBestQuery } from "@/redux/api/best.api";

import main_styles from "@/app/css/main.module.css";
import styles from "@/app/css/whybest.module.css";

const WhyBest = ({ langprop }) => {
  const { lang } = useMain();
  const { isLoading, error, data } = useGetBestQuery(lang);

  useEffect(() => {}, [data]);

  return (
    <section className={`${styles.whybestContainer} ${main_styles.container}`}>
      <HeaderSection lang={langprop} />

      <div className={`${styles.downBlock}`}>
        {!data ? (
          <Loader />
        ) : (
          data.data.map((item, index) => {
            return (
              <article
                key={`whybestKey_${index}`}
                className={`${styles.bestBlock}`}
              >
                <div className={`${styles.oneBlock}`}>
                  <Image
                    unoptimized
                    src={`${process.env.NEXT_PUBLIC_CONNECT}://${process.env.NEXT_PUBLIC_URL_API}${item.attributes.icon.data.attributes.url}`}
                    alt=""
                    fill
                  />
                  <h2>{item.attributes.title}</h2>
                </div>
                <div className={`${styles.oneBlock}`}>
                  {item.attributes.text ? <p>{item.attributes.text}</p> : null}
                </div>
              </article>
            );
          })
        )}
        <Image src={"/bg_back.png"} alt={""} fill />
      </div>
    </section>
  );
};

const HeaderSection = ({ lang }) => {
  useEffect(() => {}, [lang]);

  switch (lang) {
    case "ru":
      return (
        <>
          <h2>Почему выбирают нас?</h2>
        </>
      );
      break;
    case "en":
      return (
        <>
          <h2>Why choose us?</h2>
        </>
      );
      break;
    default:
      return;
  }
};

export default WhyBest;
