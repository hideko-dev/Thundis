import s from "../../css/home.module.css";
import Link from "next/link";
import { Inter } from "@next/font/google";
const bold = Inter({
    weight: "700",
    subsets: ['latin']
});
const tiny = Inter({
    weight: "500",
    subsets: ['latin']
});

export default function Top() {
    return (
        <>
            <div className={`${s.top} ${bold.className}`}>
                <div className={s.left}>
                    <img src="logo.svg" alt="logo" className={s.logoimg}/>
                    <div className={s.texts}>
                        <p className={s.title}>Thundis</p>
                        <p className={s.subtitle}>Clarify your Discord account status</p>
                        <p className={`${s.bio} ${tiny.className}`}>It is simple, cooperative, ready to use and fast. Modernized Rest API.</p>
                    </div>
                    <div className={`${s.btns} ${tiny.className}`}>
                        <Link href="/docs">
                            <div className={s.btn}>Read the docs</div>
                        </Link>
                    </div>
                    {/*<div className={s.cards}>*/}
                    {/*    <div className={s.card}>*/}
                    {/*        <div className={s.cardtitle}>Advanced</div>*/}
                    {/*        <div className={s.carddesc}>The API returns almost everything that can be taken from Discord information.</div>*/}
                    {/*    </div>*/}
                    {/*    <div className={s.card}>*/}
                    {/*        <div className={s.cardtitle}>Responsive</div>*/}
                    {/*        <div className={s.carddesc}>Support for rapid API response.</div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </>
    )
}