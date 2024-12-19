"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/app/css/forms.module.css";
import { useMain, useStater } from "@/hooks/useStater";
import { useActions } from "@/hooks/useActions";
import mainBg from "@/app/images/downFormBg.png";
import mainBgMobile from "@/app/images/downFormBgMobile.png";

export const Forms = ({ header = "", job = "", type = "main" }) => {
  const defaultMailToSend = "null@null.ru";

  const { lang, mobile } = useMain();
  const { setModule } = useActions();
  const [sendStatus, setSendStatus] = useState(false);
  const [statusSending, setStatusSending] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [canSubmit, setCanSubmit] = useState(true); // Добавляем состояние для отслеживания возможности отправки формы
  const [timeRemaining, setTimeRemaining] = useState(0); // Добавляем состояние для отслеживания оставшегося времени до следующей отправки

  const localeTextH3 = {
    ru: "Хотите с нами сотрудничать?",
    en: "Do you want to cooperate with us?",
  };
  const localeButtonOrder = {
    ru: "Заявка оставлена!",
    en: "Application submitted!",
  };
  const localeTextP = {
    ru: "Напишите адрес электронной почты и мы свяжемся с вами",
    en: "Write your email address and we will contact you",
  };
  const localeButton = {
    ru: "Рассчитать",
    en: "Send",
  };
  const loadingButton = {
    ru: "Отправка...",
    en: "Sending",
  };
  const localePlaceholder = {
    ru: "Эл. почта",
    en: "Email",
  };
  const localHeaderModule = {
    ru: "Оставьте свои данные и мы перезвоним вам в ближайшее время",
    en: "Leave your details and we will call you back as soon as possible",
  };
  const sliderHeaderLang = {
    ru: "Рассчитать стоимость",
    en: "Calculate the cost",
  };
  const cityFromLang = {
    ru: "Город отправки",
    en: "Departure city",
  };
  const cityToLang = {
    ru: "Город доставки",
    en: "Delivery city",
  };
  const infoLang = {
    ru: "Оставьте свой номер телефона, мы перезвоним в ближайшее время и всё подробно расскажем.",
    en: "Leave your phone number, we will call you back soon and tell you everything in detail.",
  };
  const weightLang = {
    ru: "Вес груза",
    en: "Cargo weight",
  };
  const volumeLang = {
    ru: "Объем",
    en: "Volume",
  };
  const youNameLang = {
    ru: "Ваше имя",
    en: "your name",
  };
  const smallHeaderMainLang = {
    ru: "Бесплатная консультация",
    en: "Free consultation",
  };
  const bigHeaderMainLang = {
    ru: "Оптимизируйте вашу логистику с нами",
    en: "Optimize your logistics with us",
  };
  const telLang = {
    ru: "Телефон",
    en: "Phone number",
  };

  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSubmit) {
      // Если форму нельзя отправить, выходим из функции
      return;
    }

    const dataForm = new FormData(formRef.current);

    const validateResult = validateForms(dataForm, formRef);
    if (!validateResult) return;

    const formJSON = {};

    dataForm.forEach(function (value, key) {
      formJSON[key] = value;
    });

    //Отправка данных
    setCanSubmit(false);
    setTimeRemaining(30);

    const request = await fetch(
      `${process.env.NEXT_PUBLIC_CONNECT}://${process.env.NEXT_PUBLIC_CALLBACK}/`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_JWT_ORDER,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: formJSON,
        }),
      }
    );

    if (await request) {
      const result = await request.json();
      if (result.id) {
        setInfoMessage("Ошибка :(");
      } else {
        setInfoMessage("Заявка отправлена!");
        setTimeout(() => {
          setInfoMessage("");
        }, 1000000);
      }
    }
  };

  useEffect(() => {}, [infoMessage]);
  useEffect(() => {
    let timer;

    if (!canSubmit) {
      // Если форму нельзя отправить, запускаем таймер на 30 секунд
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    // Очищаем таймер при размонтировании компонента и когда можно отправлять форму
    return () => clearInterval(timer);
  }, [canSubmit]);

  useEffect(() => {
    // Если оставшееся время дошло до нуля, разрешаем отправку формы
    if (timeRemaining === 0) {
      setCanSubmit(true);
    }
  }, [timeRemaining]);

  const exit = (e) => {
    e.preventDefault();
  };

  switch (type) {
    case "callback":
      return (
        <form onSubmit={!statusSending ? handleSubmit : exit} ref={formRef}>
          {!sendStatus ? (
            <>
              <input type="name" name="name" placeholder={youNameLang[lang]} />
              <input type="tel" name="tel" placeholder={telLang[lang]} />
              <input type="text" name="text" placeholder="Комментарий" />
              <input
                type="hidden"
                name="to"
                value={process.env.NEXT_PUBLIC_JOBSMAL || ''}
              />
              <button onClick={(f) => f} type="submit">
                {!statusSending ? localeButton[lang] : loadingButton[lang]}
              </button>
            </>
          ) : (
            <h3>
              {" "}
              Заявка отправлена! <br /> Скоро Вам позвонят!{" "}
            </h3>
          )}
        </form>
      );
      break;
    case "module":
      return (
        <form
          className={styles.moduleForm}
          onSubmit={!statusSending ? handleSubmit : exit}
          ref={formRef}
        >
          {!sendStatus ? (
            <>
              <h3>{localHeaderModule[lang]}</h3>
              <input type="name" name="name" placeholder="Имя" />
              <input type="tel" name="tel" placeholder="Телефон" />
              <input
                type="hidden"
                name="to"
                value={process.env.NEXT_PUBLIC_JOBSMAL || ''}
              />
              <input type="hidden" name="job" value={job} />
              <button onClick={(f) => f} type="submit">
                {!statusSending ? localeButton[lang] : loadingButton[lang]}
              </button>
            </>
          ) : (
            <h3>
              {" "}
              Заявка отправлена! <br /> Скоро Вам позвонят!{" "}
            </h3>
          )}
          <div onClick={() => setModule(false)} className={styles.exitModule}>
            <span></span>
            <span></span>
          </div>
        </form>
      );
      break;
    case "slider":
      return (
        <form
          onSubmit={!statusSending ? handleSubmit : exit}
          className={`${styles.sliderForm}`}
          ref={formRef}
        >
          {!sendStatus ? (
            <>
              {mobile ? (
                <h2
                  style={{
                    width: "70%",
                    textAlign: "center",
                    textTransform: "uppercase",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {sliderHeaderLang[lang]}
                </h2>
              ) : ''}
              {!mobile ? <h3>{sliderHeaderLang[lang]}</h3> : ''}

              <div className={styles.mainContainer}>
                <div className={styles.contactsFormContainer}>
                  <input
                    type="text"
                    name="name"
                    placeholder={youNameLang[lang]}
                  />
                  <input type="tel" name="tel" placeholder={telLang[lang]} />
                </div>

                <div className={styles.cityesContainer}>
                  <input
                    type="text"
                    name="cityFrom"
                    placeholder={cityFromLang[lang]}
                  />
                  {!mobile ? (
                    <Image
                      src={"/beetween.svg"}
                      alt={"Иконка Между городами"}
                      fill
                    />
                  ) : null}
                  <input
                    type="text"
                    name="cityTo"
                    placeholder={cityToLang[lang]}
                  />
                </div>
                <div className={styles.dataContainer}>
                  <div className={styles.dataRow}>
                    <input
                      type="text"
                      name="weight"
                      placeholder={weightLang[lang]}
                    />
                    {!mobile ? (
                      <Image
                        src={"/kg.svg"}
                        alt={"Иконка Между городами"}
                        fill
                      />
                    ) : null}
                  </div>
                  <div className={styles.dataRow}>
                    <input
                      type="text"
                      name="volume"
                      placeholder={volumeLang[lang]}
                    />
                    {!mobile ? (
                      <Image
                        src={"/volume.svg"}
                        alt={"Иконка Между городами"}
                        fill
                      />
                    ) : null}
                  </div>
                </div>
              </div>

              <input
                type="hidden"
                name="to"
                value={process.env.NEXT_PUBLIC_JOBSMAL || ''}
              />
              {canSubmit ? (
                <button onClick={(f) => f} type="submit">
                  {!statusSending ? localeButton[lang] : loadingButton[lang]}
                </button>
              ) : (
                <button>{localeButtonOrder[lang]}</button>
              )}
            </>
          ) : (
            <h3>
              {" "}
              Заявка отправлена! <br /> Скоро Вам позвонят!{" "}
            </h3>
          )}
        </form>
      );
      break;
    case "subscribe":
      return (
        <>
          <div className={styles.toColumn}>
            <h4>{localeTextH3[lang]}</h4>
            <p>{localeTextP[lang]}</p>
          </div>
          <form
            onSubmit={!statusSending ? handleSubmit : exit}
            className={`${styles.subscribeForm}`}
            ref={formRef}
          >
            {!sendStatus ? (
              <>
                <input
                  type="email"
                  name="email"
                  placeholder={localePlaceholder[lang]}
                />
                <input
                  type="hidden"
                  name="to"
                  value={process.env.NEXT_PUBLIC_JOBSMAL || ''}
                />
                {canSubmit ? (
                  <button onClick={(f) => f} type="submit">
                    {!statusSending ? localeButton[lang] : loadingButton[lang]}
                  </button>
                ) : (
                  <button>{localeButtonOrder[lang]}</button>
                )}
              </>
            ) : (
              <h3>
                {" "}
                Заявка отправлена! <br /> Скоро Вам позвонят!{" "}
              </h3>
            )}
          </form>
        </>
      );
      break;
    case "tarrifs":
      return (
        <form
          onSubmit={!statusSending ? handleSubmit : exit}
          className={`${styles.leftForm}`}
          ref={formRef}
        >
          {!sendStatus ? (
            <>
              <h3>{sliderHeaderLang[lang]}</h3>

              <div className={`${styles.mainContainer} ${styles.tarrifsForm}`}>
                <div className={styles.cityesContainer}>
                  <label htmlFor="name">{youNameLang[lang]}</label>
                  <input
                    type="text"
                    name="name"
                    placeholder={youNameLang[lang]}
                  />
                  <label htmlFor="tel">{telLang[lang]}</label>
                  <input type="tel" name="tel" placeholder={telLang[lang]} />
                  <label htmlFor="cityFrom">{cityFromLang[lang]}</label>
                  <input type="text" name="cityFrom" placeholder="" />
                  <label htmlFor="cityTo">{cityToLang[lang]}</label>
                  <input type="text" name="cityTo" placeholder="" />
                  <label htmlFor="weight">{weightLang[lang]}</label>
                  <input type="text" name="weight" placeholder="" />
                  <label htmlFor="volume">{volumeLang[lang]}</label>
                  <input type="text" name="volume" placeholder="" />
                </div>
              </div>

              <input
                type="hidden"
                name="to"
                value={process.env.NEXT_PUBLIC_JOBSMAL || ''}
              />

              {canSubmit ? (
                <button onClick={(f) => f} type="submit">
                  {!statusSending ? localeButton[lang] : loadingButton[lang]}
                </button>
              ) : (
                <button>{localeButtonOrder[lang]}</button>
              )}
            </>
          ) : (
            <h3>
              {" "}
              Заявка отправлена! <br /> Скоро Вам позвонят!{" "}
            </h3>
          )}
        </form>
      );
      break;
    case "main":
      return (
        <div className={`${styles.mainPageForm}`}>
          <Image
            src={`${!mobile ? mainBg.src : mainBgMobile.src}`}
            alt={`Доставка грузов по всему миру`}
            fill
          />

          <p>{smallHeaderMainLang[lang]}</p>

          <h3>{bigHeaderMainLang[lang]}</h3>

          <form
            id="mainForm"
            onSubmit={!statusSending ? handleSubmit : exit}
            className={`${styles.mainForm}`}
            ref={formRef}
          >
            <div className={styles.blockFormPosition}>
              <input type="name" name="name" placeholder={youNameLang[lang]} />
              <input type="tel" name="tel" placeholder="+7 (999) 999 99 99" />

              {!canSubmit ? (
                <button onClick={(f) => f} type="submit">
                  {!statusSending ? localeButton[lang] : loadingButton[lang]}
                </button>
              ) : (
                <button>Вы уже оставили заявку!</button>
              )}
            </div>
          </form>

          <p>{infoLang[lang]}</p>
        </div>
      );
      break;
    default:
      return (
        <div>
          <p>Неизвестная форма</p>
        </div>
      );
  }
};

/**
 *
 * @param form
 * @param formRef
 * @returns {boolean}
 */
const validateForms = (form = new FormData(), formRef = {}) => {
  const checkArray = Array.from(form);
  const regTel =
    /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$$/g;

  for (let data of checkArray) {
    switch (data[0]) {
      case "tel":
        if (!data[1].match(regTel)) {
          data[1] = "Неверный номер телефона";
          break;
        }
        data[1] = "success";
      case "name":
        if (!data[1]) {
          data[1] = "Поле не может быть пустым.";
          break;
        }
        data[1] = "success";
      case "to":
        data[1] = "success";
        break;
      default:
        if (!data[1]) data[1] = "Поле не может быть пустым.";
        else data[1] = "success";
    }
  }

  if (checkArray.filter((item) => item[1] !== "success")[0]) {
    for (let i = 0; i < checkArray.length - 1; i++) {
      formRef.current[i].placeholder = checkArray[i][1];
    }
    return false;
  } else {
    return true;
  }
};
