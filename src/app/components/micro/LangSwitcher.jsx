"use client";
import Image from "next/image";
import Link from "next/link";

import { useEffect } from "react";

import { useMain, useStater } from "@/hooks/useStater";
import { useActions } from "@/hooks/useActions";

import { Loader } from "@/app/components/micro/Loader";

//import {useGetBestQuery} from "@/redux/api/best.api";

import main_styles from "@/app/css/main.module.css";
import styles from "@/app/css/header.module.css";
import { useRouter } from "next/navigation";

const langs = [
  {
    id: 1,
    name: "РУ",
    type: "ru",
  },
  {
    id: 2,
    name: "EN",
    type: "en",
  },
];

const LangSwitcher = ({}) => {
  const { setLang } = useActions();
  const { lang, mobile } = useMain();

  const router = useRouter();

  return (
    <div className={`${styles.langContainer}`}>
      {langs.map((item, index) => {
        <>
          <button
            key={item.id}
            style={{
              backgroundColor:
                lang === item.type ? "rgba(255, 255, 255,0.5)" : null,
              fontWeight: lang === item.type ? "900" : null,
              borderRadius: lang === item.type ? "50%" : null,
            }}
            onClick={() => {
              if (!mobile) {
                setLang(item.type);
                router.push("/");
              }
            }}
            onTouchStart={() => {
              setLang(item.type);
              router.push("/");
            }}
          >
            {item.name}
          </button>
          {!index ? <span>/</span> : null}
        </>;
      })}
    </div>
  );
};

export default LangSwitcher;
