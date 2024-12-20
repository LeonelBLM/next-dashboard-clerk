import { Dispatch, SetStateAction } from "react";

export type FormDocumentoProps = {
  choferId: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};