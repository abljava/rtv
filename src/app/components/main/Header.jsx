"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { useMain, usePage, useStater } from "@/hooks/useStater";
import { useActions } from "@/hooks/useActions";

import { CallBack } from "@/app/components/micro/CallBack";
import { NavigationBar } from "@/app/components/micro/NavigationBar";
import BurgerMenu from "@/app/components/micro/BurgerMenu";

import styles from "@/app/css/header.module.css";

import tanker from "@/content/tanker_clear.png";
import LangSwitcher from "@/app/components/micro/LangSwitcher";
import { Slider } from "@/app/components/Slider";
import { useGetPlusesQuery } from "@/redux/api/pluses.api";

export const Header = ({}) => {
  const path = usePathname();

  const [checkPath, setCheckPath] = useState(false);
  const [mainPath, setNoMainPath] = useState(false);

  const state = usePage();
  const { lang, mobile } = useMain();

  const { setModule, setMobile } = useActions();

  const showModal = (e) => {
    setModule(true);
  };

  useEffect(() => {
    setCheckPath(path === "/routes/pages/contacts");
    setNoMainPath(path !== "/");
  }, [path]);

  const buttonLang = {
    ru: "Запрос на доставку",
    en: "Delivery request",
  };

  const cityLang = {
    ru: "г. Находка",
    en: "Nakhodka city",
  };

  useEffect(() => {
    if (!window) return;

    if (window.innerWidth < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  });

  switch (path) {
    case "/":
      return (
        <header
          key={`key_mobile_${lang}`}
          className={`${styles.headerContainer}`}
        >
          <div className={`${styles.upHeader}`}>
            {!mobile ? (
              <Link href="/">
                <div className={`${styles.logoContainer}`}>
                  <div className={`${styles.imgContainer}`}>
                    <Image
                      unoptimized
                      alt="Логотип компании грузомир"
                      src="/logo.png"
                      fill
                    />
                  </div>
                </div>
              </Link>
            ) : null}
            {mobile ? (
              <Link href="/">
                <div className={`${styles.logoContainer}`}>
                  <div className={`${styles.imgContainer}`}>
                    <Image
                      unoptimized
                      alt="Логотип компании грузомир"
                      src="/logoSmall.svg"
                      fill
                    />
                  </div>
                </div>
              </Link>
            ) : null}
            {!mobile ? (
              <div className={`${styles.headerButtonContainer}`}>
                <button
                  onClick={() => {
                    if (!mobile) {
                      showModal();
                    }
                  }}
                >
                  {buttonLang[lang]}
                </button>
              </div>
            ) : null}

            {!mobile ? (
              <div className={`${styles.headerGeo}`}>
                <Image src={"/icons/geo.svg"} alt="Геометка г. Находка" fill />
                {cityLang[lang]}
              </div>
            ) : null}

            <LangSwitcher />

            <CallBack />

            <div className={`${styles.burgerContainerIcon}`}>
              <BurgerMenu />
            </div>
          </div>

          {!mobile ? (
            <div className={`${styles.downHeader}`}>
              <NavigationBar place={"header"} />
            </div>
          ) : null}

          <Slider />

          <HeaderPluses lang={lang} />
        </header>
      );
      break;
    default:
      return (
        <header
          key={`key_mobile_${lang}`}
          className={`${styles.headerContainer}`}
        >
          <div className={`${styles.upHeader}`}>
            {!mobile ? (
              <Link href="/">
                <div className={`${styles.logoContainer}`}>
                  <div className={`${styles.imgContainer}`}>
                    <Image
                      unoptimized
                      alt="Логотип компании грузомир"
                      src="/logo.png"
                      fill
                    />
                  </div>
                </div>
              </Link>
            ) : null}
            {mobile ? (
              <Link href="/">
                <div className={`${styles.logoContainer}`}>
                  <div className={`${styles.imgContainer}`}>
                    <Image
                      unoptimized
                      alt="Логотип компании грузомир"
                      src="/logoSmall.svg"
                      fill
                    />
                  </div>
                </div>
              </Link>
            ) : null}
            {!mobile ? (
              <div className={`${styles.headerButtonContainer}`}>
                <button
                  onClick={() => {
                    if (!mobile) {
                      showModal();
                    }
                  }}
                >
                  {buttonLang[lang]}
                </button>
              </div>
            ) : null}

            {!mobile ? (
              <div className={`${styles.headerGeo}`}>
                <Image src={"/icons/geo.svg"} alt="Геометка г. Находка" fill />
                {cityLang[lang]}
              </div>
            ) : null}

            <LangSwitcher />

            <CallBack />

            <div className={`${styles.burgerContainerIcon}`}>
              <BurgerMenu />
            </div>
          </div>

          {!mobile ? (
            <div className={`${styles.downHeader}`}>
              <NavigationBar place={"header"} />
            </div>
          ) : null}
        </header>
      );
      break;
  }
};

const HeaderName = ({ lang }) => {
  switch (lang) {
    case "ru":
      return <h1>Широкий спектр сюрвейерских и экспертных услуг</h1>;
      break;
    case "en":
      return <h1>Wide range of survey and expert services</h1>;
      break;
    default:
      return;
  }
};

const GoToServices = ({ lang }) => {
  switch (lang) {
    case "ru":
      return <Link href={"/routes/services/"}> Посмотреть все услуги </Link>;
      break;
    case "en":
      return <Link href={"/routes/services/"}> View all services </Link>;
      break;
    default:
      return;
  }
};

export const HeaderPluses = ({ lang = "ru" }) => {
  const { isLoading, error, data } = useGetPlusesQuery(lang);

  switch (lang) {
    case "ru":
      return (
        <div className={`${styles.headerIconRow} ${styles.toRow}`}>
          {!isLoading
            ? data && typeof data.data != "undefined"
              ? data.data.map((item, index) => {
                  return (
                    <div
                      key={`key_pluses_${index}`}
                      className={`${styles.topRows}`}
                    >
                      <h3>{item.attributes.title}</h3>
                      <p>{item.attributes.text}</p>
                      <Image
                        unoptimized
                        src={`${process.env.NEXT_PUBLIC_CONNECT}://${
                          process.env.NEXT_PUBLIC_HOST_API
                        }${
                          typeof item.attributes.icon.data.attributes.url ==
                          "string"
                            ? item.attributes.icon.data.attributes.url
                            : ""
                        }`}
                        alt=""
                        fill
                      />
                    </div>
                  );
                })
              : null
            : null}
        </div>
      );
      break;
    case "en":
      return (
        <div className={`${styles.headerIconRow} ${styles.toRow}`}>
          {!isLoading
            ? data && typeof data.data != "undefined"
              ? data.data.map((item, index) => {
                  return (
                    <div className={`${styles.topRows}`}>
                      <h3>{item.attributes.title}</h3>
                      <p>{item.attributes.text}</p>
                      <Image
                        unoptimized
                        src={`${process.env.NEXT_PUBLIC_CONNECT}://${
                          process.env.NEXT_PUBLIC_HOST_API
                        }${
                          typeof item.attributes.icon.data.attributes.url ==
                          "string"
                            ? item.attributes.icon.data.attributes.url
                            : ""
                        }`}
                        alt=""
                        fill
                      />
                    </div>
                  );
                })
              : null
            : null}
        </div>
      );
      break;
    default:
      return;
  }
};
