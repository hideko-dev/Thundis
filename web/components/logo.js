import s from "../css/logo.module.css"
import { Roboto } from "@next/font/google"
import { Inter } from "@next/font/google";

const Font = Inter({
    weight: "400",
    subsets: ["latin"]
})

export default function Logo() {
    return (
        <>
            <div className={s.logo}>
                <img src="logo.svg" alt=""/>
                <p style={{fontSize: 20, fontWeight: 800}} className={Font.className}>Thundis</p>
            </div>
        </>
    )
}