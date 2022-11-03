import logoImg from "../assets/images/2x/logo.png";
import Image from "next/image";

export function Logo(props: any) {
  return (
    <Image
      className={props.className}
      src={logoImg}
      alt={"meihui logo"}
      width={65}
      height={55}
      objectFit="contain"
      quality={30}
    />
  );
}
