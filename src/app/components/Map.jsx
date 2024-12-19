"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMain, useStater } from "@/hooks/useStater";
import { useActions } from "@/hooks/useActions";
import { Loader } from "@/app/components/micro/Loader";
import main_styles from "@/app/css/main.module.css";
import styles from "@/app/css/map.module.css";

const Map = ({ langprop }) => {
  const { lang } = useMain();
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {});

  return (
    <section
      className={`${styles.whybestContainer} ${main_styles.container} ${styles.mapContainer}`}
    >
      <HeaderSection lang={lang} />

      <div
        onTouchMove={(e) => {
          setMouseX(e.touches[0].clientX);
          setMouseY(e.touches[0].clientY);
        }}
        className={`${styles.downBlock}`}
      >
        <MapImage x={mouseX} y={mouseY} />
      </div>
    </section>
  );
};

const MapImage = ({ x, y }) => {
  const maxScale = 2;

  const [mobile, setMobile] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (window) {
      setMobile(window.innerWidth < 550);
    }
  }, [mobile]);

  useEffect(() => {}, [x, y]);

  if (!mobile)
    return (
      <Image
        src={"/map2.png"}
        alt={"Карта которая показывает регионы работы"}
        fill
      />
    );

  return (
    <>
      {scale == 1 ? (
        <Image
          onClick={() => {
            if (scale == maxScale) setScale(1);
            else setScale(maxScale);
          }}
          className={styles.lupa}
          src={"/icons/blueLupa.png"}
          alt={"Карта которая показывает регионы работы"}
          width={32}
          height={32}
        />
      ) : null}

      <Image
        style={
          scale == maxScale
            ? {
                transform: `translate(${x}px ${y}px)`,
                left: `${x}px`,
                scale: `${scale}`,
                zIndex: "1",
              }
            : {}
        }
        onClick={() => {
          if (scale == maxScale) setScale(1);
          else setScale(maxScale);
        }}
        src={"/map2.png"}
        alt={"Карта которая показывает регионы работы"}
        fill
      />
    </>
  );
};

const HeaderSection = ({ lang }) => {
  useEffect(() => {}, [lang]);

  switch (lang) {
    case "ru":
      return (
        <>
          <div className={`${main_styles.upBlock}`}>
            <div>
              <p>Локация</p>
            </div>
            <div>
              <p></p>
            </div>
          </div>
          <h2>
            {" "}
            Региональное <strong>покрытие</strong>
          </h2>
          <p>
            Количество пирокластического материала прекращает перенос. Зона
            дифференциальных <br />
            опусканий, в пределах Молого-Шекснинской, Нерльской и Мещерской
            низменностей, <br />
            относительно слабо ослабляет малиньит
          </p>
        </>
      );
      break;
    case "en":
      return (
        <>
          <div className={`${main_styles.upBlock}`}>
            <div>
              <p>Location</p>
            </div>
            <div>
              <p></p>
            </div>
          </div>
          <h2>
            Regional <strong>coverage</strong>
          </h2>
          <p>
            The amount of pyroclastic material stops the transport. Differential
            zone
            <br />
            subsidence, within the Mologo-Sheksninskaya, Nerlskaya and
            Meshcherskaya lowlands,
            <br />
            Relatively weakly weakens malignite
          </p>
        </>
      );
      break;
    case "zh":
      return (
        <>
          <div className={`${main_styles.upBlock}`}>
            <div>
              <p>地点</p>
            </div>
            <div>
              <p></p>
            </div>
          </div>
          <h2>
            区域<strong>覆盖 </strong>
          </h2>
          <p>
            火山碎屑物质的数量阻止了转移。 差异区 <br />
            Mologo-Sheksninskaya、Nerlskaya 和 Meshcherskaya 低地内的沉降，
            <br />
            相对较弱地削弱恶性斜铁矿
          </p>
        </>
      );
      break;
    default:
      return;
  }
};

export default Map;
